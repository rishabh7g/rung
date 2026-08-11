import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App.tsx';
import { BRAND } from './brand.ts';

describe('App', () => {
  it('renders the wordmark from the single brand constant', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: BRAND })).toBeInTheDocument();
  });
});
