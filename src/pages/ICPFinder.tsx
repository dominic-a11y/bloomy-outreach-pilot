import { useState } from "react";
import { Search, Users, MapPin, Mail, ExternalLink, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ICPResult {
  id: string;
  name: string;
  username: string;
  followerCount: number;
  hasLinkInBio: boolean;
  email?: string;
  location?: string;
  platform: string;
}

export default function ICPFinder() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<ICPResult[]>([]);
  
  // Filter states
  const [checkLinkInBio, setCheckLinkInBio] = useState(false);
  const [minFollowers, setMinFollowers] = useState(false);
  const [minFollowerCount, setMinFollowerCount] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkLocation, setCheckLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  const locations = [
    "United States", "Canada", "United Kingdom", "Australia", "Germany", 
    "France", "Spain", "Italy", "Brazil", "Mexico", "India", "Japan"
  ];

  const handleSearch = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search prompt",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Search Complete",
        description: "ICP search functionality will be connected to your AI service",
      });
      setResults([]);
      setIsSearching(false);
    }, 2000);
  };

  const handleSaveToLeads = (result: ICPResult) => {
    toast({
      title: "Saved to Leads",
      description: `${result.name} has been added to your leads`,
    });
  };

  const handleExportAll = () => {
    if (results.length === 0) {
      toast({
        title: "No Results",
        description: "No results to export",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Export Complete",
      description: `${results.length} results exported to leads`,
    });
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ICP Finder
          </h1>
          <p className="text-white mt-2">
            Use AI to find your ideal customer profile with natural language
          </p>
        </div>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Prompt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Insert your prompt to describe your ideal lead..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] text-foreground"
            rows={4}
          />
          
          {/* Optional Filters */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-sm font-medium text-foreground">Optional Filters</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Link in Bio Filter */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="linkInBio"
                  checked={checkLinkInBio}
                  onCheckedChange={(checked) => setCheckLinkInBio(checked as boolean)}
                />
                <label htmlFor="linkInBio" className="text-sm text-foreground">
                  Check for link in bio
                </label>
              </div>

              {/* Email Filter */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email"
                  checked={checkEmail}
                  onCheckedChange={(checked) => setCheckEmail(checked as boolean)}
                />
                <label htmlFor="email" className="text-sm text-foreground">
                  Account must list an email
                </label>
              </div>

              {/* Minimum Followers Filter */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="minFollowers"
                  checked={minFollowers}
                  onCheckedChange={(checked) => setMinFollowers(checked as boolean)}
                />
                <label htmlFor="minFollowers" className="text-sm text-foreground">
                  Minimum follower count
                </label>
                {minFollowers && (
                  <Input
                    type="number"
                    placeholder="10000"
                    value={minFollowerCount}
                    onChange={(e) => setMinFollowerCount(e.target.value)}
                    className="w-24 h-8"
                  />
                )}
              </div>

              {/* Location Filter */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="location"
                  checked={checkLocation}
                  onCheckedChange={(checked) => setCheckLocation(checked as boolean)}
                />
                <label htmlFor="location" className="text-sm text-foreground">
                  Location
                </label>
                {checkLocation && (
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-40 h-8">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full sm:w-auto"
          >
            {isSearching ? (
              <>
                <Search className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search ICP
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Search Results
              {results.length > 0 && (
                <Badge variant="secondary">{results.length} found</Badge>
              )}
            </CardTitle>
            {results.length > 0 && (
              <Button variant="outline" onClick={handleExportAll}>
                <Save className="mr-2 h-4 w-4" />
                Export All to Leads
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium text-foreground">No results yet</h3>
              <p className="mt-2 text-muted-foreground">
                Enter a search prompt and click "Search ICP" to find your ideal customers
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {results.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground">{result.name}</h4>
                          <Badge variant="outline">@{result.username}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {result.followerCount.toLocaleString()} followers
                          </div>
                          
                          {result.hasLinkInBio && (
                            <div className="flex items-center gap-1">
                              <ExternalLink className="h-4 w-4" />
                              Link in bio
                            </div>
                          )}
                          
                          {result.email && (
                            <div className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              Email available
                            </div>
                          )}
                          
                          {result.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {result.location}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSaveToLeads(result)}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save to Leads
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}