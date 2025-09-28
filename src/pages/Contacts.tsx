import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Mail, 
  Phone,
  Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/contacts/ContactForm";

// Mock contacts data
const mockContacts = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@acmecorp.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corporation",
    position: "CEO",
    status: "active",
    lastContact: "2024-01-15",
    dealValue: 50000
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "s.johnson@techsolutions.com",
    phone: "+1 (555) 234-5678",
    company: "Tech Solutions Ltd",
    position: "CTO",
    status: "prospecting",
    lastContact: "2024-01-14",
    dealValue: 75000
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.w@globalindustries.com",
    phone: "+1 (555) 345-6789",
    company: "Global Industries",
    position: "VP Sales",
    status: "qualified",
    lastContact: "2024-01-13",
    dealValue: 120000
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma@startupxyz.com",
    phone: "+1 (555) 456-7890",
    company: "StartupXYZ",
    position: "Founder",
    status: "negotiation",
    lastContact: "2024-01-12",
    dealValue: 35000
  },
  {
    id: 5,
    name: "David Brown",
    email: "d.brown@enterprise.com",
    phone: "+1 (555) 567-8901",
    company: "Enterprise Solutions",
    position: "Director",
    status: "closed",
    lastContact: "2024-01-10",
    dealValue: 90000
  },
];

export default function Contacts() {
  const [contacts, setContacts] = useState(mockContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "prospecting": return "bg-primary text-primary-foreground";
      case "qualified": return "bg-warning text-warning-foreground";
      case "negotiation": return "bg-blue-500 text-white";
      case "closed": return "bg-green-600 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleAddContact = (contactData: any) => {
    const newContact = {
      ...contactData,
      id: Math.max(...contacts.map(c => c.id)) + 1,
      lastContact: new Date().toISOString().split('T')[0],
      dealValue: parseInt(contactData.dealValue) || 0
    };
    setContacts([...contacts, newContact]);
    setShowContactForm(false);
  };

  const handleEditContact = (contactData: any) => {
    setContacts(contacts.map(contact => 
      contact.id === editingContact.id 
        ? { ...contact, ...contactData, dealValue: parseInt(contactData.dealValue) || 0 }
        : contact
    ));
    setEditingContact(null);
    setShowContactForm(false);
  };

  const handleDeleteContact = (contactId: number) => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
          <p className="text-muted-foreground mt-2">
            Manage your customer relationships and leads
          </p>
        </div>
        <Button 
          onClick={() => {
            setEditingContact(null);
            setShowContactForm(true);
          }}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Contacts</p>
                <p className="text-2xl font-bold">{contacts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-success/10 rounded-lg">
                <Mail className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Deals</p>
                <p className="text-2xl font-bold">{contacts.filter(c => c.status !== 'closed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Phone className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pipeline Value</p>
                <p className="text-2xl font-bold">
                  ${contacts.reduce((sum, c) => sum + c.dealValue, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Building className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Companies</p>
                <p className="text-2xl font-bold">
                  {new Set(contacts.map(c => c.company)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>All Contacts ({filteredContacts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deal Value</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.id} className="hover:bg-muted/50 transition-smooth">
                    <TableCell>
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-muted-foreground">{contact.position}</div>
                      </div>
                    </TableCell>
                    <TableCell>{contact.company}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1" />
                          {contact.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1" />
                          {contact.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(contact.status)}>
                        {contact.status}
                      </Badge>
                    </TableCell>
                    <TableCell>${contact.dealValue.toLocaleString()}</TableCell>
                    <TableCell>{contact.lastContact}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setEditingContact(contact);
                            setShowContactForm(true);
                          }}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteContact(contact.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm
          contact={editingContact}
          onSave={editingContact ? handleEditContact : handleAddContact}
          onCancel={() => {
            setShowContactForm(false);
            setEditingContact(null);
          }}
        />
      )}
    </div>
  );
}