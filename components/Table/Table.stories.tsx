import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableBadge, TableColumn } from './Table';
import { Button } from '../Button';

// ─── Sample data (from Figma) ─────────────────────────────────────────────────

type Row = {
  id: string;
  status: 'success' | 'danger' | 'neutral';
  statusLabel: string;
  title: string;
  value: string;
  client: string;
};

const rows: Row[] = [
  { id: '#123466', status: 'success',  statusLabel: 'Ativo',     title: 'Serviço de reparo',                   value: 'R$ 50,00',    client: 'Daiane Ferreira' },
  { id: '#123467', status: 'success',  statusLabel: 'Ativo',     title: 'Troca de peças (ram e cpu)',           value: 'R$ 2935,00',  client: 'Henrique Duarte' },
  { id: '#123468', status: 'danger',   statusLabel: 'Cancelado', title: 'Formatação completa de Windows',       value: 'R$ 150,00',   client: 'Gráfica FastPrint' },
  { id: '#123469', status: 'success',  statusLabel: 'Ativo',     title: 'Venda de peças notebook Dell',         value: 'R$ 768,00',   client: 'Marcos Oliveira' },
  { id: '#123470', status: 'success',  statusLabel: 'Ativo',     title: 'Manutenção recorrente servidores',     value: 'R$ 1689,00',  client: 'Game Station Center' },
  { id: '#123471', status: 'neutral',  statusLabel: 'Expirado',  title: 'Venda de nobreakers e estabilizadores', value: 'R$ 85,00',   client: 'Gráfica FastPrint' },
  { id: '#123472', status: 'danger',   statusLabel: 'Cancelado', title: 'Formatação completa de Windows',       value: 'R$ 150,00',   client: 'Gráfica FastPrint' },
];

const columns: TableColumn<Row>[] = [
  {
    key: 'status',
    header: 'Status',
    width: 115,
    render: (row) => (
      <TableBadge variant={row.status}>{row.statusLabel}</TableBadge>
    ),
  },
  {
    key: 'id',
    header: 'ID',
    width: 100,
  },
  {
    key: 'title',
    header: 'Título',
    // No width → grows to fill remaining space
  },
  {
    key: 'value',
    header: 'Valor',
    width: 110,
  },
  {
    key: 'client',
    header: 'Cliente',
    width: 160,
  },
  {
    key: 'actions',
    header: '',
    width: 150,
    align: 'right',
    render: () => (
      <Button variant="text" size="sm" onClick={() => {}}>
        Ver detalhes
      </Button>
    ),
  },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Table> = {
  title: 'Componentes/Tabela',
  component: Table,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Padrão',
  render: () => (
    <Table
      columns={columns}
      rows={rows}
      getRowKey={(row) => row.id}
    />
  ),
};

export const Empty: Story = {
  name: 'Sem dados',
  render: () => (
    <Table
      columns={columns}
      rows={[]}
      emptyText="Nenhum registro encontrado."
    />
  ),
};

export const BadgeVariants: Story = {
  name: 'Variantes de Badge',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <TableBadge variant="success">Ativo</TableBadge>
      <TableBadge variant="danger">Cancelado</TableBadge>
      <TableBadge variant="neutral">Expirado</TableBadge>
    </div>
  ),
};
