import { render, screen } from '@testing-library/react';
import About from './About';
import { locale } from '../../locale'

test('renders Lorem Ipsum text', () => {
  render(<About />);
  const loremIpsum = screen.getByText(locale.LOREM_IPSUM);
  expect(loremIpsum).toBeInTheDocument();
});
