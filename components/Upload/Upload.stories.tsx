import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Upload, UploadFile } from './Upload';

const makeFile = (overrides: Partial<UploadFile> & Pick<UploadFile, 'id'>): UploadFile => ({
  name: 'documento.pdf',
  size: '200 KB',
  progress: 100,
  state: 'loaded',
  indicator: 'progress-bar',
  ...overrides,
});

const meta: Meta<typeof Upload> = {
  title: 'Formulários/Upload',
  component: Upload,
  argTypes: {
    size:   { control: 'inline-radio', options: ['MD', 'LG'] },
    type:   { control: 'inline-radio', options: ['single', 'multiple'] },
    status: { control: 'inline-radio', options: ['default', 'active'] },
    accept: { control: 'text' },
    files:  { control: false },
  },
  args: { size: 'LG', type: 'multiple', status: 'default', accept: '.jpg,.png,.pdf' },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Upload>;

export const AllStates: Story = {
  name: 'Todos os estados',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {[
        { label: 'LG · Vazio', props: { size: 'LG' as const, type: 'multiple' as const, status: 'default' as const } },
        { label: 'LG · Com arquivos (100%, 100%, 20%)', props: {
            size: 'LG' as const, type: 'multiple' as const, status: 'active' as const,
            files: [
              makeFile({ id: '1', progress: 100 }),
              makeFile({ id: '2', progress: 100 }),
              makeFile({ id: '3', progress: 20, state: 'loading' }),
            ],
          },
        },
        { label: 'MD · Vazio', props: { size: 'MD' as const, type: 'multiple' as const, status: 'default' as const } },
        { label: 'MD · Com arquivos + carregando', props: {
            size: 'MD' as const, type: 'multiple' as const, status: 'active' as const,
            files: [
              makeFile({ id: '1', indicator: undefined }),
              makeFile({ id: '2', indicator: undefined }),
              makeFile({ id: '3', state: 'loading', indicator: 'loader' }),
            ],
          },
        },
      ].map(({ label, props }) => (
        <div key={label}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#9490AC', margin: '0 0 8px', letterSpacing: 1, textTransform: 'uppercase' }}>
            {label}
          </p>
          <Upload {...props} />
        </div>
      ))}
    </div>
  ),
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
};
