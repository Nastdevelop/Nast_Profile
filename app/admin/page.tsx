"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Plus, Pencil, Trash2, LogOut, Loader2, RefreshCw, X, Upload,
} from "lucide-react";

type Tab = "experience" | "skills" | "projects";

interface Experience {
  id: number; jenis: string; content: string; tahun: string;
}
interface Skill {
  id: number; item: string; cate: string; purpose: string;
}
interface Project {
  id: number; title: string; images: string | null; desc: string | null; tech: string[]; posisi: string; url: string | null;
}

function emptyForm(tab: Tab): Record<string, string> {
  if (tab === "experience") return { jenis: "", content: "", tahun: "" };
  if (tab === "skills") return { item: "", cate: "", purpose: "" };
  return { title: "", images: "", tech: "", posisi: "fullstack", url: "" };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("experience");
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // data
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // form
  const [form, setForm] = useState<Record<string, string>>(emptyForm("experience"));
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  // image upload
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // error
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me").then((res) => {
      if (cancelled) return;
      if (!res.ok) { router.push("/admin/login"); return; }
      setAuth(true);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [router]);

  useEffect(() => {
    if (!auth) return;
    fetchData(tab);
  }, [tab, auth]);

  async function fetchData(t: Tab) {
    const res = await fetch(`/api/${t}`);
    const data = await res.json();
    if (t === "experience") setExperiences(data);
    else if (t === "skills") setSkills(data);
    else setProjects(data);
  }

  function handleEdit(item: Record<string, unknown>) {
    const f: Record<string, string> = {};
    for (const key of Object.keys(emptyForm(tab))) {
      f[key] = String(item[key] ?? "");
    }
    setForm(f);
    setPreview(String(item.images ?? ""));
    setEditing(item.id as number);
    setShowForm(true);
    setFormError("");
  }

  function handleNew() {
    setForm(emptyForm(tab));
    setEditing(null);
    setPreview(null);
    setShowForm(true);
    setFormError("");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const body: Record<string, unknown> = { ...form };
    if (tab === "projects") {
      body.tech = form.tech
        ? form.tech.split(",").map((t) => t.trim()).filter(Boolean)
        : [];
    }

    const url = editing ? `/api/${tab}/${editing}` : `/api/${tab}`;
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json();
      setFormError(data.error || "Something went wrong");
      return;
    }
    setFormError("");
    await fetchData(tab);
    setShowForm(false);
    setEditing(null);
    setPreview(null);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/${tab}/${id}`, { method: "DELETE" });
    await fetchData(tab);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    setFormError("");

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });

      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Upload failed");
        return;
      }

      setForm({ ...form, images: data.url });
      setPreview(data.url);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-dvh bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "experience", label: "Experience" },
    { key: "skills", label: "Skills" },
    { key: "projects", label: "Projects" },
  ];

  const list = tab === "experience" ? experiences : tab === "skills" ? skills : projects;

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-dvh bg-zinc-900/80 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-lg font-bold text-zinc-100">Portfolio Admin</h1>
          <p className="text-xs text-zinc-500 mt-0.5">Manage your content</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key);
                setForm(emptyForm(t.key));
                setEditing(null);
                setShowForm(false);
                setPreview(null);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                tab === t.key
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-transparent"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Link
            href="/"
            className="block w-full text-center px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-all"
          >
            View Portfolio
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 capitalize">
              {tab} Management
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              {list.length} item{list.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => fetchData(tab)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-zinc-800 transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button
              onClick={handleNew}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-all"
            >
              <Plus className="w-4 h-4" /> Add {tab}
            </button>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 mx-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-zinc-100">
                  {editing ? "Edit" : "Add"} {tab}
                </h3>
                <button
                  onClick={() => { setShowForm(false); setPreview(null); setFormError(""); }}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                {Object.keys(emptyForm(tab)).map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-zinc-400 mb-1 capitalize">
                      {key}
                    </label>

                    {/* Posisi select for projects */}
                    {tab === "projects" && key === "posisi" ? (
                      <select
                        value={form[key] ?? "fullstack"}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                      >
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="fullstack">Fullstack</option>
                      </select>
                    ) : tab === "projects" && key === "images" ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={form[key] ?? ""}
                          onChange={(e) => {
                            setForm({ ...form, [key]: e.target.value });
                            setPreview(e.target.value || null);
                          }}
                          className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-xs"
                          placeholder="Cloudinary URL or paste image link"
                        />

                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 cursor-pointer transition-all">
                            <Upload className="w-4 h-4" />
                            {uploading ? "Uploading..." : "Upload Image"}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={uploading}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(file);
                              }}
                            />
                          </label>
                          {uploading && <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />}
                        </div>

                        {preview && (
                          <div className="relative w-full h-40 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700">
                            <Image
                              src={preview}
                              alt="Preview"
                              fill
                              sizes="(max-width: 512px) 100vw, 512px"
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setForm({ ...form, images: "" });
                                setPreview(null);
                              }}
                              className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-zinc-300 hover:text-white transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        value={form[key] ?? ""}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        required={key !== "images" && key !== "posisi" && key !== "url"}
                      />
                    )}
                  </div>
                ))}

                {formError && (
                  <p className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-lg">
                    {formError}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setPreview(null); setFormError(""); }}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:bg-zinc-800/60 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white transition-all"
                  >
                    {saving ? "Saving..." : editing ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">#</th>
                {tab === "projects" && (
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Image</th>
                )}
                {Object.keys(emptyForm(tab)).filter((k) => k !== "images" && k !== "url").map((k) => (
                  <th key={k} className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    {k}
                  </th>
                ))}
                {tab === "projects" && (
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">URL</th>
                )}
                <th className="px-5 py-3.5 text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, i) => {
                const row = item as unknown as Record<string, unknown>;
                return (
                  <tr key={item.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                    <td className="px-5 py-3.5 text-sm text-zinc-500">{i + 1}</td>
                    {tab === "projects" && (
                      <td className="px-5 py-3.5">
                        {row.images ? (
                          <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-zinc-800">
                            <Image
                              src={String(row.images)}
                              alt=""
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <span className="text-zinc-600 text-xs">—</span>
                        )}
                      </td>
                    )}
                    {Object.keys(emptyForm(tab)).filter((k) => k !== "images" && k !== "url").map((k) => (
                      <td key={k} className="px-5 py-3.5 text-sm text-zinc-300 max-w-[200px] truncate">
                        {String(row[k] ?? "") || "—"}
                      </td>
                    ))}
                    {tab === "projects" && (
                      <td className="px-5 py-3.5 text-sm max-w-[180px] truncate">
                        {row.url ? (
                          <a
                            href={String(row.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                          >
                            {String(row.url)}
                          </a>
                        ) : (
                          <span className="text-zinc-600">—</span>
                        )}
                      </td>
                    )}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(row)}
                          className="p-2 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {list.length === 0 && (
                <tr>
                  <td colSpan={100} className="px-5 py-12 text-center text-sm text-zinc-600">
                    No {tab} yet. Click &ldquo;Add {tab}&rdquo; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
