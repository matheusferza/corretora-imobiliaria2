"use client";

import { useMemo, useState } from "react";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogSearch } from "@/components/blog/blog-search";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "Todos" ||
        post.category.toLowerCase() === selectedCategory.toLowerCase();

      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !normalizedQuery ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.summary.toLowerCase().includes(normalizedQuery) ||
        post.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [initialPosts, searchQuery, selectedCategory]);

  return (
    <div className="space-y-12">
      <BlogSearch
        activeCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        query={searchQuery}
        onQueryChange={setSearchQuery}
      />

      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl border bg-white p-12 text-center space-y-3">
          <h3 className="text-lg font-bold text-[var(--plum)]">
            Nenhum artigo encontrado
          </h3>
          <p className="text-sm text-[var(--ink-soft)]">
            Tente buscar com outros termos ou selecione uma categoria diferente.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
