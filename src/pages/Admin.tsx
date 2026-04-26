import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, Plus, Pencil, Trash2, LogOut } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { BRAND } from "@/lib/constants";

type Severity = "info" | "alert" | "critical";

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) navigate("/auth", { replace: true });
      else if (!isAdmin) {
        toast.error("Admin clearance required.");
        navigate("/", { replace: true });
      }
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background font-mono text-sm text-muted-foreground">
        ▸ Verifying clearance...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="h-1.5 w-full animate-siren" />
      <header className="border-b border-border bg-card/40">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Shield className="h-6 w-6 text-siren-blue" />
            <div>
              <div className="font-display text-base tracking-widest">{BRAND}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-siren-red">
                // Command terminal
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut().then(() => navigate("/"))}>
            <LogOut className="mr-1.5 h-4 w-4" /> Sign out
          </Button>
        </div>
      </header>

      <main className="container py-10">
        <Tabs defaultValue="announcements">
          <TabsList className="mb-6">
            <TabsTrigger value="announcements">Dispatches</TabsTrigger>
            <TabsTrigger value="divisions">Divisions</TabsTrigger>
            <TabsTrigger value="officers">Officers</TabsTrigger>
          </TabsList>
          <TabsContent value="announcements"><AnnouncementsAdmin /></TabsContent>
          <TabsContent value="divisions"><DivisionsAdmin /></TabsContent>
          <TabsContent value="officers"><OfficersAdmin /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

/* ============================ Announcements ============================ */
function AnnouncementsAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["announcements", "admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function remove(id: string) {
    if (!confirm("Delete this dispatch?")) return;
    const { error } = await supabase.from("announcements").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Dispatch removed.");
    qc.invalidateQueries({ queryKey: ["announcements"] });
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl tracking-widest">Dispatch Board</h2>
        <AnnouncementForm onSaved={() => qc.invalidateQueries({ queryKey: ["announcements"] })}>
          <Button className="bg-siren-blue text-white hover:bg-siren-blue/90">
            <Plus className="mr-1.5 h-4 w-4" /> New dispatch
          </Button>
        </AnnouncementForm>
      </div>

      <div className="space-y-3">
        {isLoading && <p className="font-mono text-sm text-muted-foreground">▸ Loading...</p>}
        {data?.map((a) => (
          <div key={a.id} className="flex items-start justify-between gap-4 border border-border bg-card p-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span className={severityClass(a.severity as Severity)}>{a.severity}</span>
                <span>·</span>
                <span>{new Date(a.created_at).toLocaleString()}</span>
                <span>·</span>
                <span>{a.published ? "PUBLISHED" : "DRAFT"}</span>
              </div>
              <h3 className="mt-1 font-display text-lg leading-tight">{a.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{a.body}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <AnnouncementForm
                initial={a as any}
                onSaved={() => qc.invalidateQueries({ queryKey: ["announcements"] })}
              >
                <Button variant="outline" size="sm">
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </AnnouncementForm>
              <Button variant="outline" size="sm" onClick={() => remove(a.id)}>
                <Trash2 className="h-3.5 w-3.5 text-siren-red" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function severityClass(s: Severity) {
  if (s === "critical") return "text-siren-red";
  if (s === "alert") return "text-amber-400";
  return "text-siren-blue";
}

function AnnouncementForm({
  children,
  initial,
  onSaved,
}: {
  children: React.ReactNode;
  initial?: { id: string; title: string; body: string; severity: Severity; published: boolean };
  onSaved: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [severity, setSeverity] = useState<Severity>(initial?.severity ?? "info");
  const [published, setPublished] = useState(initial?.published ?? true);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const payload = { title, body, severity, published };
    const { error } = initial
      ? await supabase.from("announcements").update(payload).eq("id", initial.id)
      : await supabase.from("announcements").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(initial ? "Dispatch updated." : "Dispatch published.");
    setOpen(false);
    if (!initial) {
      setTitle(""); setBody(""); setSeverity("info"); setPublished(true);
    }
    onSaved();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display tracking-widest">
            {initial ? "Edit dispatch" : "New dispatch"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label>Body</Label>
            <Textarea rows={6} value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Severity</Label>
              <Select value={severity} onValueChange={(v) => setSeverity(v as Severity)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="alert">Alert</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between rounded border border-border px-3">
              <Label htmlFor="pub">Published</Label>
              <Switch id="pub" checked={published} onCheckedChange={setPublished} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={save} disabled={saving || !title || !body}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ============================ Divisions ============================ */
function DivisionsAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["divisions", "admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("divisions")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  async function remove(id: string) {
    if (!confirm("Delete this division?")) return;
    const { error } = await supabase.from("divisions").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Division removed.");
    qc.invalidateQueries({ queryKey: ["divisions"] });
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl tracking-widest">Divisions</h2>
        <DivisionForm onSaved={() => qc.invalidateQueries({ queryKey: ["divisions"] })}>
          <Button className="bg-siren-blue text-white hover:bg-siren-blue/90">
            <Plus className="mr-1.5 h-4 w-4" /> New division
          </Button>
        </DivisionForm>
      </div>

      <div className="space-y-3">
        {isLoading && <p className="font-mono text-sm text-muted-foreground">▸ Loading...</p>}
        {data?.map((d) => (
          <div key={d.id} className="flex items-center gap-4 border border-border bg-card p-4">
            <div className="h-10 w-10 shrink-0 border" style={{ borderColor: d.color, background: `${d.color}1a` }} />
            <div className="min-w-0 flex-1">
              <div className="font-display text-lg">{d.name}</div>
              {d.description && (
                <div className="text-sm text-muted-foreground">{d.description}</div>
              )}
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Order #{d.sort_order} · {d.color}
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <DivisionForm
                initial={d as any}
                onSaved={() => qc.invalidateQueries({ queryKey: ["divisions"] })}
              >
                <Button variant="outline" size="sm">
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </DivisionForm>
              <Button variant="outline" size="sm" onClick={() => remove(d.id)}>
                <Trash2 className="h-3.5 w-3.5 text-siren-red" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DivisionForm({
  children,
  initial,
  onSaved,
}: {
  children: React.ReactNode;
  initial?: { id: string; name: string; description: string | null; color: string; sort_order: number };
  onSaved: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [color, setColor] = useState(initial?.color ?? "#1e3a8a");
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const payload = { name, description, color, sort_order: sortOrder };
    const { error } = initial
      ? await supabase.from("divisions").update(payload).eq("id", initial.id)
      : await supabase.from("divisions").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(initial ? "Division updated." : "Division created.");
    setOpen(false);
    if (!initial) { setName(""); setDescription(""); setColor("#1e3a8a"); setSortOrder(0); }
    onSaved();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display tracking-widest">
            {initial ? "Edit division" : "New division"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div>
            <Label>Description</Label>
            <Textarea rows={3} value={description ?? ""} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Color</Label>
              <div className="flex items-center gap-2">
                <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-14 p-1" />
                <Input value={color} onChange={(e) => setColor(e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Sort order</Label>
              <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={save} disabled={saving || !name}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ============================ Officers ============================ */
function OfficersAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["officers", "admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("officers")
        .select("*, divisions(name, color)")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });
  const { data: divisions } = useQuery({
    queryKey: ["divisions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("divisions").select("id, name").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  async function remove(id: string) {
    if (!confirm("Remove this officer?")) return;
    const { error } = await supabase.from("officers").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Officer removed.");
    qc.invalidateQueries({ queryKey: ["officers"] });
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl tracking-widest">Officers</h2>
        <OfficerForm divisions={divisions ?? []} onSaved={() => qc.invalidateQueries({ queryKey: ["officers"] })}>
          <Button className="bg-siren-blue text-white hover:bg-siren-blue/90">
            <Plus className="mr-1.5 h-4 w-4" /> New officer
          </Button>
        </OfficerForm>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {isLoading && <p className="font-mono text-sm text-muted-foreground">▸ Loading...</p>}
        {data?.map((o) => {
          const div = o.divisions as { name?: string; color?: string } | null;
          return (
            <div key={o.id} className="flex items-center gap-4 border border-border bg-card p-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden border border-border bg-secondary">
                {o.avatar_url && (
                  <img src={o.avatar_url} alt={o.name} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display text-base">{o.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {o.badge_number ? `Badge #${o.badge_number} · ` : ""}{div?.name ?? "Unassigned"}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <OfficerForm
                  divisions={divisions ?? []}
                  initial={o as any}
                  onSaved={() => qc.invalidateQueries({ queryKey: ["officers"] })}
                >
                  <Button variant="outline" size="sm"><Pencil className="h-3.5 w-3.5" /></Button>
                </OfficerForm>
                <Button variant="outline" size="sm" onClick={() => remove(o.id)}>
                  <Trash2 className="h-3.5 w-3.5 text-siren-red" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OfficerForm({
  children,
  divisions,
  initial,
  onSaved,
}: {
  children: React.ReactNode;
  divisions: { id: string; name: string }[];
  initial?: { id: string; name: string; division_id: string | null; badge_number: string | null; avatar_url: string | null; sort_order: number };
  onSaved: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initial?.name ?? "");
  const [divisionId, setDivisionId] = useState<string | null>(initial?.division_id ?? null);
  const [badgeNumber, setBadgeNumber] = useState(initial?.badge_number ?? "");
  const [avatarUrl, setAvatarUrl] = useState(initial?.avatar_url ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const payload = {
      name,
      division_id: divisionId,
      badge_number: badgeNumber || null,
      avatar_url: avatarUrl || null,
      sort_order: sortOrder,
    };
    const { error } = initial
      ? await supabase.from("officers").update(payload).eq("id", initial.id)
      : await supabase.from("officers").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(initial ? "Officer updated." : "Officer added.");
    setOpen(false);
    if (!initial) { setName(""); setDivisionId(null); setBadgeNumber(""); setAvatarUrl(""); setSortOrder(0); }
    onSaved();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display tracking-widest">
            {initial ? "Edit officer" : "New officer"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Badge number</Label>
              <Input value={badgeNumber ?? ""} onChange={(e) => setBadgeNumber(e.target.value)} />
            </div>
            <div>
              <Label>Sort order</Label>
              <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
            </div>
          </div>
          <div>
            <Label>Division</Label>
            <Select value={divisionId ?? "none"} onValueChange={(v) => setDivisionId(v === "none" ? null : v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Unassigned</SelectItem>
                {divisions.map((d) => (
                  <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Avatar URL</Label>
            <Input
              placeholder="https://..."
              value={avatarUrl ?? ""}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={save} disabled={saving || !name}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Admin;
