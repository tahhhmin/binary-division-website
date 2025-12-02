'use client';

import { useState, useEffect } from 'react';
import { INews } from '@/models/news.model';

// ShadCN Components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2, Edit, ExternalLink, Plus, X } from "lucide-react";

import styles from "./NewsControl.module.css";

interface NewsItem extends INews {
  // backend sometimes returns `id` (string) and sometimes `_id`
  _id: string;
  id?: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Delete confirmation state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // Edit dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    imageLink: '',
    description: '',
    date: '',
    links: ['']
  });

  // Form state for creating new news
  const [formData, setFormData] = useState({
    title: '',
    imageLink: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    links: ['']
  });

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Normalize item to ensure _id exists
  const normalizeItem = (raw: any): NewsItem => {
    const normalized: NewsItem = {
      _id: raw._id || raw.id || String(raw._id) || String(raw.id) || '',
      id: raw.id || undefined,
      title: raw.title || '',
      description: raw.description || '',
      imageLink: raw.imageLink || raw.thumbnail || '',
      date: raw.date || raw.createdAt || '',
      links: Array.isArray(raw.links) ? raw.links : [],
    };
    return normalized;
  };

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`/api/news/get?limit=10&page=${currentPage}`);
      const data = await response.json();

      if (data.success) {
        // Ensure each item has _id for edit/delete
        const items: any[] = data.data || [];
        const normalized = items.map(normalizeItem);
        setNews(normalized);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalItems(data.pagination?.totalItems || items.length || 0);
      } else {
        setError(data.error || 'Failed to fetch news');
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Error fetching news');
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const filteredLinks = (formData.links || []).filter(link => link && link.trim() !== '');

      const payload = {
        ...formData,
        links: filteredLinks,
        // convert date from yyyy-mm-dd to ISO if provided
        date: formData.date ? new Date(formData.date).toISOString() : undefined,
      };

      const response = await fetch('/api/news/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('News created successfully!');
        // reset form
        setFormData({
          title: '',
          imageLink: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
          links: ['']
        });
        // refresh list to page 1
        setCurrentPage(1);
        await fetchNews();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Failed to create news');
      }
    } catch (err) {
      console.error('Error creating news:', err);
      setError('Error creating news');
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async () => {
    if (!itemToDelete) return;

    setDeleteLoading(itemToDelete);
    setError('');

    try {
      const response = await fetch(`/api/news/delete?id=${encodeURIComponent(itemToDelete)}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('News deleted successfully!');
        // refresh current page
        await fetchNews();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Failed to delete news');
      }
    } catch (err) {
      console.error('Error deleting news:', err);
      setError('Error deleting news');
    } finally {
      setDeleteLoading(null);
      setDeleteConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  // UPDATE
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const filteredLinks = (editFormData.links || []).filter(link => link && link.trim() !== '');

      const payload: any = {
        id: editingItem._id, // <--- IMPORTANT: send _id as id
        title: editFormData.title,
        imageLink: editFormData.imageLink,
        description: editFormData.description,
        links: filteredLinks,
      };

      if (editFormData.date) {
        payload.date = new Date(editFormData.date).toISOString();
      }

      const response = await fetch('/api/news/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('News updated successfully!');
        setEditDialogOpen(false);
        setEditingItem(null);
        await fetchNews();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || data.message || 'Failed to update news');
      }
    } catch (err) {
      console.error('Error updating news:', err);
      setError('Error updating news');
    } finally {
      setLoading(false);
    }
  };

  // Form handlers
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLinkChange = (index: number, value: string, isEdit = false) => {
    if (isEdit) {
      const updated = [...editFormData.links];
      updated[index] = value;
      setEditFormData(prev => ({ ...prev, links: updated }));
    } else {
      const updated = [...formData.links];
      updated[index] = value;
      setFormData(prev => ({ ...prev, links: updated }));
    }
  };

  const addLinkField = (isEdit = false) => {
    if (isEdit) {
      setEditFormData(prev => ({ ...prev, links: [...prev.links, ''] }));
    } else {
      setFormData(prev => ({ ...prev, links: [...prev.links, ''] }));
    }
  };

  const removeLinkField = (index: number, isEdit = false) => {
    if (isEdit) {
      setEditFormData(prev => ({
        ...prev,
        links: prev.links.filter((_, i) => i !== index)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        links: prev.links.filter((_, i) => i !== index)
      }));
    }
  };

  // Open edit dialog (normalizes item first)
  const openEditDialog = (item: NewsItem) => {
    setEditingItem(item);
    setEditFormData({
      title: item.title || '',
      imageLink: item.imageLink || '',
      description: item.description || '',
      date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
      links: Array.isArray(item.links) && item.links.length > 0 ? item.links : ['']
    });
    setEditDialogOpen(true);
  };

  // Open delete confirmation
  const openDeleteConfirm = (id: string) => {
    setItemToDelete(id);
    setDeleteConfirmOpen(true);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">News Management</h2>
          <Badge variant="secondary" className="text-sm">
            Total: {totalItems} articles
          </Badge>
        </div>

        {/* Global Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setError('')}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex justify-between items-center">
            <span>{success}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSuccess('')}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">News List</TabsTrigger>
            <TabsTrigger value="create">Create News</TabsTrigger>
          </TabsList>

          {/* NEWS LIST TAB */}
          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Recent News Articles</span>
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  {news.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <p>No news articles yet.</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => document.querySelector<HTMLButtonElement>('[value="create"]')?.click()}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Article
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {news.map((item) => (
                        <div key={item._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex gap-4">
                            <img
                              src={item.imageLink || '/placeholder-image.jpg'}
                              alt={item.title}
                              className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                              }}
                            />

                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-lg truncate pr-2">
                                  {item.title}
                                </h3>
                                <div className="flex gap-2 flex-shrink-0">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => openEditDialog(item)}
                                    disabled={!!deleteLoading}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => openDeleteConfirm(item._id)}
                                    disabled={deleteLoading === item._id}
                                  >
                                    {deleteLoading === item._id ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    )}
                                  </Button>
                                </div>
                              </div>

                              <p className="text-sm text-gray-500 mb-2">
                                {item.date ? new Date(item.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                }) : 'No date'}
                              </p>

                              <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                                {item.description}
                              </p>

                              {item.links && item.links.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {item.links.map((link, idx) => (
                                    <a
                                      key={idx}
                                      href={link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                      Link {idx + 1}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-4 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1 || loading}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-gray-600 px-4">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages || loading}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* CREATE NEWS TAB */}
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create News Article</CardTitle>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* TITLE */}
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter article title"
                      disabled={loading}
                    />
                  </div>

                  {/* DATE */}
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>

                  {/* IMAGE */}
                  <div>
                    <Label htmlFor="imageLink">Image URL *</Label>
                    <Input
                      id="imageLink"
                      type="url"
                      name="imageLink"
                      value={formData.imageLink}
                      onChange={handleInputChange}
                      required
                      placeholder="https://example.com/image.jpg"
                      disabled={loading}
                    />
                    {formData.imageLink && (
                      <div className="mt-2">
                        <img
                          src={formData.imageLink}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Enter article description"
                      disabled={loading}
                    />
                  </div>

                  {/* LINKS */}
                  <div>
                    <Label>Related Links</Label>
                    <div className="space-y-2">
                      {formData.links.map((link, idx) => (
                        <div key={idx} className="flex gap-2">
                          <Input
                            type="url"
                            value={link}
                            onChange={e => handleLinkChange(idx, e.target.value)}
                            placeholder="https://example.com"
                            disabled={loading}
                          />
                          {formData.links.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeLinkField(idx)}
                              disabled={loading}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addLinkField()}
                      className="mt-2"
                      disabled={loading}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Link
                    </Button>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create News Article'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* EDIT DIALOG */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit News Article</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleUpdate} className="space-y-4 mt-4">
              {/* TITLE */}
              <div>
                <Label htmlFor="edit-title">Title *</Label>
                <Input
                  id="edit-title"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditInputChange}
                  required
                  placeholder="Enter article title"
                  disabled={loading}
                />
              </div>

              {/* DATE */}
              <div>
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  name="date"
                  value={editFormData.date}
                  onChange={handleEditInputChange}
                  disabled={loading}
                />
              </div>

              {/* IMAGE */}
              <div>
                <Label htmlFor="edit-imageLink">Image URL *</Label>
                <Input
                  id="edit-imageLink"
                  type="url"
                  name="imageLink"
                  value={editFormData.imageLink}
                  onChange={handleEditInputChange}
                  required
                  placeholder="https://example.com/image.jpg"
                  disabled={loading}
                />
                {editFormData.imageLink && (
                  <div className="mt-2">
                    <img
                      src={editFormData.imageLink}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* DESCRIPTION */}
              <div>
                <Label htmlFor="edit-description">Description *</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditInputChange}
                  required
                  rows={4}
                  placeholder="Enter article description"
                  disabled={loading}
                />
              </div>

              {/* LINKS */}
              <div>
                <Label>Related Links</Label>
                <div className="space-y-2">
                  {editFormData.links.map((link, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        type="url"
                        value={link}
                        onChange={e => handleLinkChange(idx, e.target.value, true)}
                        placeholder="https://example.com"
                        disabled={loading}
                      />
                      {editFormData.links.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeLinkField(idx, true)}
                          disabled={loading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addLinkField(true)}
                  className="mt-2"
                  disabled={loading}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Link
                </Button>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditDialogOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Article'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* DELETE CONFIRMATION DIALOG */}
        <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the news article.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={!!deleteLoading}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={!!deleteLoading}
                className="bg-red-600 hover:bg-red-700"
              >
                {deleteLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
