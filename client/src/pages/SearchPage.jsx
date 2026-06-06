import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/layout/Loading';
import ArticleCard from '../components/ui/ArticleCard'; // تأكدي من المسار

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/news/search?q=${query}`);
        setResults(res.data);
      } catch (err) {
        console.error("خطأ في جلب نتائج البحث", err);
      } finally {
        setLoading(false);
      }
    };
    if (query) fetchResults();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 min-h-screen">
      <h1 className="text-2xl font-black mb-8 text-slate-800">نتائج البحث عن: "{query}"</h1>
      
      {loading ? <Loading /> : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map(article => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-slate-500 font-bold">لم يتم العثور على مقالات تطابق بحثك.</p>
      )}
    </div>
  );
}