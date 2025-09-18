import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, Filter, ArrowLeft, Beaker, Star } from 'lucide-react';
import { useState } from 'react';
import SafetyIndicator, { SafetyLevel } from './SafetyIndicator';

interface Ingredient {
  name: string;
  safetyLevel: SafetyLevel;
  score: number;
  function: string;
  description: string;
  concerns?: string[];
  alternatives?: string[];
  chemicalFormula?: string;
  isActive?: boolean;
}

interface IngredientAnalysisProps {
  productName: string;
  productBrand: string;
  ingredients: Ingredient[];
  overallScore: number;
  onBack: () => void;
}

export default function IngredientAnalysis({
  productName,
  productBrand,
  ingredients,
  overallScore,
  onBack
}: IngredientAnalysisProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<SafetyLevel | 'all'>('all');

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLevel === 'all' || ingredient.safetyLevel === filterLevel;
    return matchesSearch && matchesFilter;
  });

  const getOverallSafetyLevel = (score: number): SafetyLevel => {
    if (score >= 7) return 'safe';
    if (score >= 4) return 'moderate';
    return 'avoid';
  };

  return (
    <div className="space-y-4" data-testid="ingredient-analysis">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onBack}
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-semibold" data-testid="text-product-name">
            {productName}
          </h1>
          <p className="text-sm text-muted-foreground" data-testid="text-product-brand">
            {productBrand}
          </p>
        </div>
      </div>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Overall Safety Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-3xl font-bold" data-testid="text-overall-score">
                {overallScore}/10
              </div>
              <SafetyIndicator 
                level={getOverallSafetyLevel(overallScore)} 
                showText={true}
              />
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div>Based on {ingredients.length} ingredients</div>
              <div>
                {ingredients.filter(i => i.safetyLevel === 'avoid').length} flagged ingredients
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full Ingredient List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Beaker className="h-5 w-5" />
            Complete Ingredient List ({ingredients.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-3">
            All ingredients listed in order of concentration (highest to lowest):
          </div>
          <div className="flex flex-wrap gap-1">
            {ingredients.map((ingredient, index) => (
              <Badge 
                key={ingredient.name} 
                variant={ingredient.isActive ? "default" : "secondary"}
                className={`text-xs ${ingredient.isActive ? 'bg-primary text-primary-foreground' : ''}`}
                data-testid={`badge-full-ingredient-${index}`}
              >
                {ingredient.isActive && <Star className="h-3 w-3 mr-1" />}
                {ingredient.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Ingredients Section */}
      {ingredients.filter(i => i.isActive).length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-primary">
              <Star className="h-5 w-5" />
              Active Ingredients ({ingredients.filter(i => i.isActive).length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ingredients.filter(i => i.isActive).map((ingredient, index) => (
                <div key={ingredient.name} className="p-3 bg-background rounded-lg border">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{ingredient.name}</h4>
                        <SafetyIndicator 
                          level={ingredient.safetyLevel} 
                          score={ingredient.score}
                          size="sm"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{ingredient.function}</p>
                      {ingredient.chemicalFormula && (
                        <div className="flex items-center gap-2 text-xs">
                          <Beaker className="h-3 w-3 text-muted-foreground" />
                          <code className="bg-muted px-2 py-1 rounded font-mono">
                            {ingredient.chemicalFormula}
                          </code>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
            data-testid="input-search-ingredients"
          />
        </div>
        <div className="flex gap-1">
          {(['all', 'safe', 'moderate', 'avoid'] as const).map((level) => (
            <Button
              key={level}
              variant={filterLevel === level ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterLevel(level)}
              data-testid={`button-filter-${level}`}
            >
              {level === 'all' ? 'All' : level.charAt(0).toUpperCase() + level.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Detailed Ingredient Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Detailed Ingredient Analysis ({filteredIngredients.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {filteredIngredients.map((ingredient, index) => (
              <AccordionItem 
                key={ingredient.name} 
                value={ingredient.name}
                className="border rounded-lg px-4"
                data-testid={`accordion-ingredient-${index}`}
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full mr-4">
                    <div className="flex items-center gap-3">
                      <SafetyIndicator 
                        level={ingredient.safetyLevel} 
                        score={ingredient.score}
                        size="sm"
                      />
                      <div className="text-left">
                        <div className="font-medium flex items-center gap-2" data-testid={`text-ingredient-name-${index}`}>
                          {ingredient.isActive && <Star className="h-4 w-4 text-primary" />}
                          {ingredient.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {ingredient.function}
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-3">
                  <div className="text-sm text-muted-foreground">
                    {ingredient.description}
                  </div>

                  {ingredient.chemicalFormula && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Beaker className="h-4 w-4" />
                        Chemical Formula
                      </h4>
                      <code className="text-sm font-mono bg-background px-3 py-2 rounded border">
                        {ingredient.chemicalFormula}
                      </code>
                    </div>
                  )}
                  
                  {ingredient.concerns && ingredient.concerns.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm mb-2">Potential Concerns:</h4>
                      <div className="flex flex-wrap gap-1">
                        {ingredient.concerns.map((concern, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {concern}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {ingredient.alternatives && ingredient.alternatives.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm mb-2">Safer Alternatives:</h4>
                      <div className="text-sm text-muted-foreground">
                        {ingredient.alternatives.join(', ')}
                      </div>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}