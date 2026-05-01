import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Avatar from '@/components/Avatar'

describe('Avatar', () => {
  it('renders the first letter of a regular name', () => {
    render(<Avatar name="James" />)
    expect(screen.getByText('J')).toBeTruthy()
  })

  it('renders the first two uppercase letters of a PascalCase name', () => {
    render(<Avatar name="JohnDoe" />)
    expect(screen.getByText('JD')).toBeTruthy()
  })

  it('renders single letter when name has only one uppercase letter', () => {
    render(<Avatar name="alice" />)
    expect(screen.getByText('A')).toBeTruthy()
  })
})
