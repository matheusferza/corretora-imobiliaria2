"use client";

import { useState } from "react";
import { BlogSearch } from "@/components/blog/blog-search";
import { BlogCard } from "@/components/blog/blog-card";

interface Post {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  authorName: string;
  readingTimeMinutes: number;
  publishedAt: Date | string;
  coverImage?: string | null;
}

interface BlogClientWrapperProps {
  initialPosts: Post[];
}

export function BlogClientWrapper({ initialPosts }: BlogClientWrapperProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string, category: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (category && category !== "Todos") params.set("category", category);

      const res = await fetch(`/api/blog?${params.toString()}`);
      const data = await res.json();
      if (data.posts) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error("Erro ao filtrar posts:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <BlogSearch onSearch={handleSearch} />

      {loading ? (
        <div className="py-12 text-center text-sm text-[var(--ink-soft)]">
          Carregando artigos...
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-2xl border bg-white p-12 text-center space-y-3">
          <h3 className="text-lg font-bold text-[var(--plum)]">Nenhum artigo encontrado</h3>
          <p className="text-sm text-[var(--ink-soft)]">
            Tente buscar com outros termos ou selecione uma categoria diferente.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
