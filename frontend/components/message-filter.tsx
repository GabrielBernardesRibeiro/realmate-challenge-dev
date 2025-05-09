"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search } from "lucide-react";

interface MessageFilterProps {
  filtroStatus: "todas";
  setFiltroStatus: (status: "todas") => void;
  termoBusca: string;
  setTermoBusca: (termo: string) => void;
}

export function MessageFilter({
  filtroStatus,
  setFiltroStatus,
  termoBusca,
  setTermoBusca,
}: MessageFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Filtrar Mensagens</h2>
          <p className="text-sm text-muted-foreground">
            Filtre as mensagens por status ou busque por texto
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar mensagens..."
            className="pl-8"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </div>
      </div>

      <RadioGroup
        defaultValue="todas"
        className="flex flex-wrap gap-4"
        value={filtroStatus}
        onValueChange={(value) => setFiltroStatus(value as "todas")}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="todas" id="todas" />
          <Label htmlFor="todas">Todas</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="aberta" id="aberta" />
          <Label htmlFor="aberta">Abertas</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="fechada" id="fechada" />
          <Label htmlFor="fechada">Fechadas</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
