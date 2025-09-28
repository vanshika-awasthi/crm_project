import { useState } from "react";
import { Plus, DollarSign, Calendar, User, MoreVertical, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DealForm } from "@/components/deals/DealForm";

// Mock deals data
const mockDeals = [
  {
    id: 1,
    title: "Acme Corp - CRM Implementation",
    value: 50000,
    stage: "prospecting",
    contact: "John Smith",
    company: "Acme Corporation",
    closeDate: "2024-03-15",
    probability: 25,
    description: "Complete CRM system implementation for enterprise client"
  },
  {
    id: 2,
    title: "Tech Solutions - Software License",
    value: 75000,
    stage: "qualification",
    contact: "Sarah Johnson",
    company: "Tech Solutions Ltd",
    closeDate: "2024-02-28",
    probability: 50,
    description: "Annual software licensing deal"
  },
  {
    id: 3,
    title: "Global Industries - Consulting",
    value: 120000,
    stage: "proposal",
    contact: "Mike Wilson",
    company: "Global Industries",
    closeDate: "2024-04-10",
    probability: 75,
    description: "6-month consulting engagement"
  },
  {
    id: 4,
    title: "StartupXYZ - Development",
    value: 35000,
    stage: "negotiation",
    contact: "Emma Davis",
    company: "StartupXYZ",
    closeDate: "2024-02-15",
    probability: 90,
    description: "Custom development project"
  },
  {
    id: 5,
    title: "Enterprise Solutions - Integration",
    value: 90000,
    stage: "closed-won",
    contact: "David Brown",
    company: "Enterprise Solutions",
    closeDate: "2024-01-30",
    probability: 100,
    description: "System integration project"
  }
];

const stages = [
  { id: "prospecting", name: "Prospecting", color: "bg-gray-100 text-gray-800" },
  { id: "qualification", name: "Qualification", color: "bg-blue-100 text-blue-800" },
  { id: "proposal", name: "Proposal", color: "bg-yellow-100 text-yellow-800" },
  { id: "negotiation", name: "Negotiation", color: "bg-orange-100 text-orange-800" },
  { id: "closed-won", name: "Closed Won", color: "bg-green-100 text-green-800" },
  { id: "closed-lost", name: "Closed Lost", color: "bg-red-100 text-red-800" }
];

export default function Deals() {
  const [deals, setDeals] = useState(mockDeals);
  const [showDealForm, setShowDealForm] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);

  const handleAddDeal = (dealData: any) => {
    const newDeal = {
      ...dealData,
      id: Math.max(...deals.map(d => d.id)) + 1,
      value: parseInt(dealData.value) || 0,
      probability: parseInt(dealData.probability) || 0
    };
    setDeals([...deals, newDeal]);
    setShowDealForm(false);
  };

  const handleEditDeal = (dealData: any) => {
    setDeals(deals.map(deal => 
      deal.id === editingDeal.id 
        ? { 
            ...deal, 
            ...dealData, 
            value: parseInt(dealData.value) || 0,
            probability: parseInt(dealData.probability) || 0
          }
        : deal
    ));
    setEditingDeal(null);
    setShowDealForm(false);
  };

  const handleDeleteDeal = (dealId: number) => {
    setDeals(deals.filter(deal => deal.id !== dealId));
  };

  const moveDeal = (dealId: number, newStage: string) => {
    setDeals(deals.map(deal => 
      deal.id === dealId ? { ...deal, stage: newStage } : deal
    ));
  };

  const getStageDeals = (stageId: string) => {
    return deals.filter(deal => deal.stage === stageId);
  };

  const getTotalValue = () => {
    return deals.reduce((sum, deal) => sum + deal.value, 0);
  };

  const getWeightedValue = () => {
    return deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Deals Pipeline</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage your sales opportunities
          </p>
        </div>
        <Button 
          onClick={() => {
            setEditingDeal(null);
            setShowDealForm(true);
          }}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Deal
        </Button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Pipeline</p>
                <p className="text-2xl font-bold">${getTotalValue().toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-success/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Weighted Pipeline</p>
                <p className="text-2xl font-bold">${getWeightedValue().toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Deals</p>
                <p className="text-2xl font-bold">{deals.filter(d => !d.stage.includes('closed')).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto">
        {stages.map((stage) => {
          const stageDeals = getStageDeals(stage.id);
          const stageValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
          
          return (
            <Card key={stage.id} className="shadow-card min-h-[500px]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{stage.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {stageDeals.length}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  ${stageValue.toLocaleString()}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {stageDeals.map((deal) => (
                  <Card key={deal.id} className="p-3 hover:shadow-md transition-smooth cursor-pointer border-l-4 border-primary">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-medium line-clamp-2">{deal.title}</h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                              setEditingDeal(deal);
                              setShowDealForm(true);
                            }}>
                              <Edit className="h-3 w-3 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteDeal(deal.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-3 w-3 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="flex items-center text-xs text-muted-foreground">
                        <User className="h-3 w-3 mr-1" />
                        {deal.contact}
                      </div>
                      
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {deal.closeDate}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">
                          ${deal.value.toLocaleString()}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {deal.probability}%
                        </Badge>
                      </div>
                      
                      {deal.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {deal.description}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Deal Form Modal */}
      {showDealForm && (
        <DealForm
          deal={editingDeal}
          onSave={editingDeal ? handleEditDeal : handleAddDeal}
          onCancel={() => {
            setShowDealForm(false);
            setEditingDeal(null);
          }}
        />
      )}
    </div>
  );
}