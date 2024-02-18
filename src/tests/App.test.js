import { render, screen } from '@testing-library/react';
import Fixture from '../fixtures';
import App from '../App';

test('Website has Little lemon logo with alt text', () => {
  render(<Fixture><App /></Fixture>);
  const logos = screen.getAllByAltText(/Little Lemon Restaurant/i);
  expect(logos[0]).toBeInTheDocument();
});
