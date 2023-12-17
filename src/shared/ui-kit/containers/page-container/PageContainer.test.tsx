import { render, screen } from "@testing-library/react";

import { PageContainer } from "."

describe('PageContainer', () => {
  it('it should contain content', () => {
    const testText = 'some text'
    const testContent = <div>{testText}</div>;
    render(<PageContainer>{testContent}</PageContainer>);

    const content = screen.getByText(testText);
    expect(content).toBeInTheDocument();
  });
})
