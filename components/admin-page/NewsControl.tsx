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

import styles from "./NewsControl.module.css";

interface NewsItem extends INews {
  _id: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    imageLink: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    links: ['']
  });

  // Load news
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news/create?limit=10');
      const data = await response.json();

      if (data.success) {
        setNews(data.data);
      } else {
        setError('Failed to fetch news');
      }
    } catch {
      setError('Error fetching news');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const filteredLinks = formData.links.filter(link => link.trim() !== '');

      const response = await fetch('/api/news/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, links: filteredLinks }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('News created successfully!');
        setFormData({
          title: '',
          imageLink: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
          links: ['']
        });
        fetchNews();
      } else {
        setError(data.error || 'Failed to create news');
      }
    } catch {
      setError('Error creating news');
    } finally {
      setLoading(false);
    }
  };

  // Form handlers
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLinkChange = (index: number, value: string) => {
    const updated = [...formData.links];
    updated[index] = value;
    setFormData(prev => ({ ...prev, links: updated }));
  };

  const addLinkField = () => {
    setFormData(prev => ({ ...prev, links: [...prev.links, ''] }));
  };

  const removeLinkField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <h2>News Management</h2>

                <div className={styles.grid}>
                
                {/* ------------------ CREATE NEWS FORM ------------------ */}
                    <Card className={styles.form}>
                        <CardHeader>
                            <CardTitle>
                                <h4>Create News Article</h4>
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                        {error && (
                            <p className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</p>
                        )}
                        {success && (
                            <p className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</p>
                        )}

                        <form onSubmit={handleSubmit}>

                            {/* TITLE */}
                            <div>
                            <Label><p>Title *</p></Label>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter title"
                            />
                            </div>

                            {/* DATE */}
                            <div>
                            <Label><p>Date</p></Label>
                            <Input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                            />
                            </div>

                            {/* IMAGE */}
                            <div>
                            <Label>Image URL *</Label>
                            <Input
                                type="url"
                                name="imageLink"
                                value={formData.imageLink}
                                onChange={handleInputChange}
                                required
                                placeholder="https://example.com/image.jpg"
                            />
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                            <Label>Description *</Label>
                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                rows={4}
                            />
                            </div>

                            {/* LINKS */}
                            <div>
                            <Label>Related Links</Label>

                            {formData.links.map((link, idx) => (
                                <div key={idx} className="flex gap-2 mb-2">
                                <Input
                                    type="url"
                                    value={link}
                                    onChange={e => handleLinkChange(idx, e.target.value)}
                                    placeholder="https://example.com"
                                />

                                {formData.links.length > 1 && (
                                    <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => removeLinkField(idx)}
                                    >
                                    Remove
                                    </Button>
                                )}
                                </div>
                            ))}

                            <Button
                                variant="secondary"
                                type="button"
                                onClick={addLinkField}
                            >
                                Add Link
                            </Button>
                            </div>

                            <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Creating..." : "Create News"}
                            </Button>
                        </form>
                        </CardContent>
                    </Card>

                {/* ------------------ NEWS LIST ------------------ */}
                <Card className={styles.newsList}>
                    <CardHeader>
                    <CardTitle>Recent News</CardTitle>
                    </CardHeader>

                    <CardContent>
                    <ScrollArea className={styles.listScroll}>
                        {news.length === 0 && (
                        <p className="text-gray-500">No news articles yet.</p>
                        )}

                        {news.map((item) => (
                        <div key={item._id} className="pb-4">
                            <div className="flex gap-4">
                            <img
                                src={item.imageLink}
                                className="w-24 h-24 object-cover rounded-md"
                            />

                            <div className="flex-1">
                                <h3 className="font-semibold">{item.title}</h3>

                                <p className="text-sm text-gray-500 mt-1">
                                {new Date(item.date).toLocaleDateString()}
                                </p>

                                <p className="text-sm mt-2 line-clamp-2">
                                {item.description}
                                </p>

                                {item.links?.length > 0 && (
                                <p className="text-xs text-gray-500 mt-1">
                                    {item.links.length} link(s)
                                </p>
                                )}
                            </div>
                            </div>

                            <Separator className="my-4" />
                        </div>
                        ))}
                    </ScrollArea>
                    </CardContent>
                </Card>

                </div>
            </div>
        </div>
    );
}
