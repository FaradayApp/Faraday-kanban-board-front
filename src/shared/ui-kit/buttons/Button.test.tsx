import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Button } from '.';

describe('Button', () => {
  it('it should be on the screen', () => {
    render(<Button>test</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('it should contain the correct text', () => {
    const textContent = 'test text';
    render(<Button>{textContent}</Button>);
    
    const button = screen.getByRole('button');
    const text = button.textContent;
    expect(text).toBe(textContent);
  });

  it('it should be disabled', () => {
    render(<Button disabled>test</Button>);
    
    const button = screen.getByRole('button');   
    expect(button).toBeDisabled();
  });

  it('it should be called after clicking', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>test</Button>);

    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  })

  it('it should not be called after clicking', async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>test</Button>);

    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(0);
  })
});
