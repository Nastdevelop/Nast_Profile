"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ExperienceRow {
  id: number;
  jenis: string;
  content: string;
  tahun: string;
}

export function ExperienceTable({
  data,
  onEdit,
  onDelete,
}: {
  data: ExperienceRow[];
  onEdit: (item: Record<string, unknown>) => void;
  onDelete: (id: number) => void;
}) {
  const columns: ColumnDef<ExperienceRow>[] = [
    {
      accessorKey: "tahun",
      header: "Tahun",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-zinc-400">{row.original.tahun}</span>
      ),
    },
    {
      accessorKey: "jenis",
      header: "Jenis",
      cell: ({ row }) => (
        <span className="font-medium text-zinc-100">{row.original.jenis}</span>
      ),
    },
    {
      accessorKey: "content",
      header: "Pengalaman",
      enableSorting: false,
      cell: ({ row }) => (
        <p className="max-w-md truncate text-sm text-zinc-400">
          {row.original.content}
        </p>
      ),
    },
    {
      id: "actions",
      enableSorting: false,
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-zinc-500 hover:text-zinc-200"
              >
                <MoreHorizontal className="w-4 h-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-zinc-800">
              <DropdownMenuItem onClick={() => onEdit(row.original)}>
                <Pencil className="w-4 h-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(row.original.id)}
                className="text-red-400 focus:text-red-300 focus:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="jenis"
      searchPlaceholder="Cari pengalaman..."
    />
  );
}
