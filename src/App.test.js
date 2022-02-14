import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('Renders Header', () => {
  render(<App />);
  const linkElement = screen.getByText(/To Do List/i);
  expect(linkElement).toBeInTheDocument();
});

test('Renders Submit Button', () => {
  render(<App />);
  const element = screen.getByText(/^enter$/);
  fireEvent.click(element)
})

test('Input element is rendered', () => {
  render(<App />);
  const input = screen.getByRole("textbox");
  fireEvent.change(input, {target: {value: "gym"} });
  expect(input.value).toBe("gym");
})
