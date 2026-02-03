# Contributing to Let's UI

Thanks for your interest in contributing to **Let's UI**. This project is an open-source design system focused on simplicity, scalability, and well-structured design tokens. Every contribution is welcome.

## Code of Conduct

Be respectful. Discussions should stay constructive, inclusive, and professional. Harassment, disrespectful behavior, or personal attacks will not be tolerated.

## What You Can Contribute

You can help by:

- Creating or improving components
- Proposing or updating design tokens
- Fixing bugs
- Improving documentation
- Suggesting improvements to accessibility or semantics

Before starting any large change, open an issue to discuss the proposal.

## Project Structure

- `tokens/`: source files for design tokens
- `dist/`: generated CSS files (do not edit manually)

Design tokens are generated automatically. Any manual change in generated files will be rejected.

## Getting Started

1. Fork the repository
2. Create a new branch from `main`
3. Make your changes following the guidelines below
4. Commit with clear and descriptive messages
5. Open a Pull Request

## Design Tokens Guidelines

- Follow the DTCG naming and structure
- Tokens must be semantic when possible
- Avoid hard-coded values in components
- Keep light/dark and brand variations consistent

## Components Guidelines

- Components must be built using HTML and CSS only
- Prefer composition over duplication
- Ensure accessibility (ARIA, contrast, focus states)
- Keep class names predictable and consistent

## Commit Messages

Use clear, simple messages. Examples:

- `feat: add button loading state`
- `fix: correct spacing token scale`
- `docs: update contribution guidelines`

## Pull Requests

- One focused change per PR
- Reference related issues
- Describe what was changed and why
- Include screenshots or examples when visual changes are involved

## Review Process

All Pull Requests are reviewed. Feedback is part of the process. Changes may be requested before approval.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thanks for helping make Let's UI better.
