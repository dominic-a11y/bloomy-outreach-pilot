import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  ArrowLeft, 
  Plus, 
  Save, 
  Send, 
  CheckCircle, 
  XCircle, 
  Eye, 
  AlertTriangle,
  Shield,
  Smartphone,
  History,
  MessageCircle,
  Trash2
} from 'lucide-react';
import { useOpeners } from '@/contexts/OpenersContext';
import { Opener, OpenerVariant } from '@/types/openers';

export default function OpenerEditor() {
  const { openerId } = useParams<{ openerId: string }>();
  const navigate = useNavigate();
  const { 
    openers, 
    currentUser, 
    safeMode, 
    createOpener, 
    updateOpener, 
    createVariant, 
    updateVariant,
    submitForReview,
    approveOpener,
    rejectOpener
  } = useOpeners();

  const isNew = openerId === 'new';
  const opener = isNew ? null : openers.find(o => o.id === openerId);
  
  const [formData, setFormData] = useState({
    name: '',
    language: 'en',
    tone: 'calm' as 'calm' | 'confident' | 'playful' | 'formal',
    tags: [] as string[]
  });
  
  const [variants, setVariants] = useState<Omit<OpenerVariant, 'id' | 'openerId' | 'createdAt'>[]>([
    {
      name: 'Variant 1',
      body: '',
      variables: [],
      hasSpintax: false,
      riskScore: 0,
      version: 1,
      enabled: true
    }
  ]);

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [previewData, setPreviewData] = useState({
    first_name: 'Sarah',
    brand: 'FitLife',
    niche: 'fitness',
    recent_post: 'morning workout routine',
    geo: 'Los Angeles'
  });

  useEffect(() => {
    if (opener) {
      setFormData({
        name: opener.name,
        language: opener.language,
        tone: opener.tone,
        tags: opener.tags
      });
      setVariants(opener.variants.map(v => ({
        name: v.name,
        body: v.body,
        variables: v.variables,
        hasSpintax: v.hasSpintax,
        riskScore: v.riskScore,
        version: v.version,
        enabled: v.enabled
      })));
    }
  }, [opener]);

  const availableVariables = [
    { key: 'first_name', label: 'First Name', example: 'Sarah' },
    { key: 'brand', label: 'Brand', example: 'FitLife' },
    { key: 'niche', label: 'Niche', example: 'fitness' },
    { key: 'recent_post', label: 'Recent Post', example: 'morning workout routine' },
    { key: 'geo', label: 'Location', example: 'Los Angeles' }
  ];

  const currentVariant = variants[selectedVariantIndex];

  const getRiskScore = (text: string) => {
    let score = 0;
    const bannedWords = ['guaranteed', 'make money', 'free money', 'instant'];
    const aggressiveWords = ['must', 'now', 'urgent', 'limited time'];
    
    bannedWords.forEach(word => {
      if (text.toLowerCase().includes(word)) score += 3;
    });
    
    aggressiveWords.forEach(word => {
      if (text.toLowerCase().includes(word)) score += 1;
    });
    
    if (text.includes('http')) score += 2;
    if (text.length > 500) score += 1;
    
    return Math.min(score, 10);
  };

  const extractVariables = (text: string): string[] => {
    const matches = text.match(/\{([^}]+)\}/g);
    return matches ? matches.map(match => match.slice(1, -1)) : [];
  };

  const hasSpintax = (text: string): boolean => {
    return /\{[^}]*\|[^}]*\}/.test(text);
  };

  const updateCurrentVariant = (index: number, updates: Partial<typeof currentVariant>) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], ...updates };
    
    if (updates.body) {
      newVariants[index].variables = extractVariables(updates.body);
      newVariants[index].hasSpintax = hasSpintax(updates.body);
      newVariants[index].riskScore = getRiskScore(updates.body);
    }
    
    setVariants(newVariants);
  };

  const addVariant = () => {
    const newVariant = {
      name: `Variant ${variants.length + 1}`,
      body: '',
      variables: [],
      hasSpintax: false,
      riskScore: 0,
      version: 1,
      enabled: true
    };
    setVariants([...variants, newVariant]);
    setSelectedVariantIndex(variants.length);
  };

  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      const newVariants = variants.filter((_, i) => i !== index);
      setVariants(newVariants);
      setSelectedVariantIndex(Math.max(0, selectedVariantIndex - 1));
    }
  };

  const insertVariable = (variable: string) => {
    const textarea = document.querySelector('textarea[name="body"]') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = currentVariant.body;
      const newText = text.slice(0, start) + `{${variable}}` + text.slice(end);
      updateCurrentVariant(selectedVariantIndex, { body: newText });
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + variable.length + 2, start + variable.length + 2);
      }, 0);
    }
  };

  const renderPreview = () => {
    let text = currentVariant.body;
    
    // Replace variables
    Object.entries(previewData).forEach(([key, value]) => {
      text = text.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    });
    
    // Handle spintax (simple implementation)
    text = text.replace(/\{([^}]*)\|([^}]*)\}/g, '$1');
    
    return text;
  };

  const handleSave = async () => {
    try {
      if (isNew) {
        const openerId = await createOpener({
          ...formData,
          status: 'draft',
          variants: [],
          reviews: [],
          createdBy: currentUser.id,
          campaignUsageCount: 0
        });
        
        for (const variant of variants) {
          await createVariant(openerId, variant);
        }
        
        navigate(`/openers/edit/${openerId}`);
      } else if (opener) {
        await updateOpener(opener.id, formData);
        // Handle variant updates here
      }
    } catch (error) {
      console.error('Failed to save opener:', error);
    }
  };

  const canApprove = currentUser.role === 'admin' || currentUser.role === 'reviewer';
  const hasHighRisk = variants.some(v => v.riskScore > 6);
  const canSave = formData.name && variants.some(v => v.body.trim());

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/openers')}
            className="gap-1 text-white hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Openers
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {isNew ? 'New Opener' : `Edit ${opener?.name}`}
            </h1>
            {opener && (
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`text-xs ${
                  opener.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {opener.status}
                </Badge>
                {safeMode && (
                  <Badge variant="outline" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Safe Mode
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <History className="h-4 w-4 mr-2" />
            Version History
          </Button>
          <Button variant="outline" size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            Comments
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Editor */}
        <div className="space-y-6">
          {/* Basic Fields */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-lg text-white">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white">Opener Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 bg-muted/50 border-border text-white"
                  placeholder="e.g., Fitness Brand Cold Intro"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-white">Language</label>
                <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
                  <SelectTrigger className="mt-1 bg-muted/50 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-white">Use Case Tags</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['cold_reachout', 're_engagement', 'compliance_safe', 'high_conversion'].map(tag => (
                    <Badge
                      key={tag}
                      variant={formData.tags.includes(tag) ? 'default' : 'outline'}
                      className={`cursor-pointer text-white ${formData.tags.includes(tag) ? 'bg-primary border-primary' : 'border-white hover:bg-white hover:text-black'}`}
                      onClick={() => {
                        const newTags = formData.tags.includes(tag)
                          ? formData.tags.filter(t => t !== tag)
                          : [...formData.tags, tag];
                        setFormData({ ...formData, tags: newTags });
                      }}
                    >
                      {tag.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personalization Variables */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-lg text-white">Available Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {availableVariables.map(variable => (
                  <Button
                    key={variable.key}
                    variant="outline"
                    size="sm"
                    onClick={() => insertVariable(variable.key)}
                    className="justify-start text-left"
                  >
                    <span className="font-mono text-xs">{`{${variable.key}}`}</span>
                    <span className="text-muted-foreground ml-2">{variable.example}</span>
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Click to insert variables into your message. Variables will be replaced with actual data when sent.
              </p>
            </CardContent>
          </Card>

          {/* Message Composer */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-lg text-white">Message Composer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white">Message Body</label>
                <Textarea
                  name="body"
                  value={currentVariant.body}
                  onChange={(e) => updateCurrentVariant(selectedVariantIndex, { body: e.target.value })}
                  className="mt-1 bg-muted/50 border-border text-white min-h-32"
                  placeholder="Write your opener message here..."
                />
                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                  <span>{currentVariant.body.length}/500 characters</span>
                  <div className="flex items-center gap-4">
                    {currentVariant.hasSpintax && (
                      <Badge variant="outline" className="text-xs">
                        Spintax detected
                      </Badge>
                    )}
                    {currentVariant.riskScore > 0 && (
                      <Badge className={`text-xs ${
                        currentVariant.riskScore > 6 ? 'bg-red-500/20 text-red-400' :
                        currentVariant.riskScore > 3 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        Risk: {currentVariant.riskScore}/10
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {currentVariant.riskScore > 6 && safeMode && (
                <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span className="text-sm text-red-400">
                    High risk content detected. Safe mode prevents saving.
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Variants */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center justify-between">
                Variants ({variants.length})
                <Button size="sm" onClick={addVariant} className="gap-1">
                  <Plus className="h-3 w-3" />
                  Add Variant
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {variants.map((variant, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedVariantIndex === index 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedVariantIndex(index)}
                  >
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={variant.enabled}
                        onCheckedChange={(checked) => updateCurrentVariant(index, { enabled: checked })}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div>
                        <div className="font-medium text-white">{variant.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {variant.body.slice(0, 50)}...
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${
                        variant.riskScore > 6 ? 'bg-red-500/20 text-red-400' :
                        variant.riskScore > 3 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {variant.riskScore}
                      </Badge>
                      {variants.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeVariant(index);
                          }}
                          className="h-6 w-6 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preview */}
        <div className="space-y-6">
          {/* Live Preview */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"></div>
                  <div>
                    <div className="font-medium text-white text-sm">@yourbrand</div>
                    <div className="text-xs text-gray-400">Direct message</div>
                  </div>
                </div>
                
                <div className="bg-blue-600 rounded-2xl rounded-bl-md p-3 text-white text-sm leading-relaxed">
                  {renderPreview() || 'Start typing your message...'}
                </div>
                
                <div className="text-xs text-gray-400 mt-2 text-right">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              
              <div className="mt-4 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Character count: {renderPreview().length}/500</span>
                  <span>Estimated send time: 0.2s</span>
                </div>
              </div>
            </CardContent>
          </Card>


        </div>
      </div>

      {/* Footer Actions */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {hasHighRisk && safeMode && (
                <div className="flex items-center gap-1 text-red-400">
                  <Shield className="h-4 w-4" />
                  Safe mode active - high risk content blocked
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleSave}
                disabled={!canSave || (hasHighRisk && safeMode)}
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              
              <Button 
                onClick={() => opener && updateOpener(opener.id, { status: 'active' })}
                disabled={!canSave || (hasHighRisk && safeMode)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Activate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}