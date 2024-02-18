import { render, screen } from '@testing-library/react';
import App from './App';

test('Website has Little lemon logo with alt text', () => {
  render(<App />);
  const logos = screen.getAllByAltText(/Little Lemon Restaurant/i);
  expect(logos[0]).toBeInTheDocument();
});
