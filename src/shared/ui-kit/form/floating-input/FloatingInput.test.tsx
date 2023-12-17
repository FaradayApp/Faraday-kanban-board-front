import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FloatingInput } from '.';

describe('FloatingInput', () => {
  it('it should be in the document', () => {
    const labelContent = 'test label';
    render(<FloatingInput label={labelContent} />);

    const label = screen.getByText(labelContent);
    expect(label).toBeInTheDocument();
  });

  it('it should be invalid', () => {
    render(<FloatingInput isInvalid={true} label={''} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('it should be with controls', () => {
    const controlsText = 'test control';
    const Button = <button>{controlsText}</button>;
    render(<FloatingInput label={''} controls={Button} />);

    const controls = screen.getByText(controlsText);
    expect(controls).toBeInTheDocument();
  });

  it('it should be with the label after the type text', async () => {
    const labelContent = 'test label';
    render(<FloatingInput label={labelContent} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'sometheing');
    const label = screen.getByText(labelContent);
    expect(label).toBeInTheDocument();
  });

  it('it should be with typed text', async () => {
    const text = 'something';
    render(<FloatingInput label='' />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, text);
    expect(input).toHaveValue(text);
  })
});
