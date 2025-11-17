# CLAUDE.md - AI Assistant Guide

## Project Overview

**Repository**: success-html-card
**Purpose**: HTML success card component library/application
**Status**: Early development stage

This repository is designed to create reusable HTML success card components, likely for use in web applications to display success messages, confirmations, or positive user feedback.

## Repository Structure

### Current Structure
```
success-html-card/
├── .git/           # Git repository metadata
├── t.md            # Temporary/test file
└── CLAUDE.md       # This file - AI assistant guide
```

### Expected Future Structure
```
success-html-card/
├── src/            # Source code
│   ├── components/ # HTML components
│   ├── styles/     # CSS/styling files
│   └── js/         # JavaScript files
├── dist/           # Built/compiled output
├── examples/       # Usage examples
├── tests/          # Test files
├── docs/           # Documentation
├── package.json    # Node.js dependencies
├── README.md       # Project documentation
└── CLAUDE.md       # This file
```

## Development Workflow

### Git Branching Strategy

**Main Branch**: `main` (or default branch)
**Feature Branches**: Follow the pattern `claude/feature-name-<session-id>`

Current working branch: `claude/add-claude-documentation-01U2FbaV7B6Exp7wHbzrWxX4`

### Git Commit Guidelines

1. **Commit Message Format**:
   ```
   <type>: <subject>

   <optional body>
   ```

2. **Types**:
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes (formatting, no logic change)
   - `refactor`: Code refactoring
   - `test`: Adding or updating tests
   - `chore`: Maintenance tasks

3. **Examples**:
   ```
   feat: add success card component with icon support

   docs: update README with installation instructions

   fix: correct z-index stacking issue in card overlay
   ```

### Git Push Protocol

- Always use: `git push -u origin <branch-name>`
- Branch names MUST start with `claude/` and end with matching session ID
- Retry logic for network failures: Up to 4 times with exponential backoff (2s, 4s, 8s, 16s)

### Git Fetch/Pull Protocol

- Prefer specific branches: `git fetch origin <branch-name>`
- Use for pulls: `git pull origin <branch-name>`
- Same retry logic as push operations

## Code Conventions

### HTML Guidelines

1. **Semantic HTML**: Use appropriate HTML5 semantic elements
2. **Accessibility**: Include ARIA labels and roles where appropriate
3. **Class Naming**: Use BEM (Block Element Modifier) methodology
   ```html
   <!-- Example -->
   <div class="success-card">
     <div class="success-card__icon"></div>
     <h2 class="success-card__title"></h2>
     <p class="success-card__message"></p>
   </div>
   ```

### CSS/Styling Guidelines

1. **Mobile-First**: Design for mobile, enhance for desktop
2. **CSS Variables**: Use CSS custom properties for theming
3. **Responsive Design**: Use relative units (rem, em, %) over fixed pixels
4. **Browser Compatibility**: Support modern browsers (last 2 versions)

### JavaScript Guidelines

1. **ES6+**: Use modern JavaScript features
2. **Modular Code**: Keep functions small and focused
3. **No Global Pollution**: Use modules or IIFE patterns
4. **Error Handling**: Always handle errors gracefully

### File Naming Conventions

- Use kebab-case for files: `success-card.html`, `success-card.css`
- Component files should be grouped: `success-card/index.html`, `success-card/styles.css`

## Testing Practices

### Manual Testing
- Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on different screen sizes (mobile, tablet, desktop)
- Verify accessibility with screen readers

### Automated Testing (Future)
- Unit tests for JavaScript functionality
- Visual regression tests for components
- Accessibility tests with axe or similar tools

## Security Considerations

### Common Vulnerabilities to Avoid

1. **XSS (Cross-Site Scripting)**
   - Sanitize all user input
   - Use textContent instead of innerHTML when possible
   - Validate and escape data before rendering

2. **Dependency Security**
   - Regularly update dependencies
   - Use `npm audit` to check for vulnerabilities
   - Review third-party code before including

3. **Content Security Policy**
   - Implement CSP headers when deploying
   - Avoid inline scripts and styles in production

## AI Assistant Guidelines

### Task Approach

1. **Planning First**: Use TodoWrite tool for complex tasks
2. **Explore Before Implementing**: Use Task tool with Explore agent for codebase understanding
3. **Read Before Writing**: Always read existing files before modifying
4. **Incremental Changes**: Make small, focused changes
5. **Test After Changes**: Verify changes don't break existing functionality

### Communication Style

- Be concise and technical
- Avoid emojis unless requested
- Focus on facts over validation
- Use code references with `file:line` format

### File Operations

- **Prefer Editing**: Edit existing files rather than creating new ones
- **Use Specialized Tools**: Use Read/Edit/Write tools instead of bash commands
- **Parallel Operations**: Run independent operations in parallel

### Before Committing

1. Review all changes with `git status` and `git diff`
2. Ensure commit messages follow conventions
3. Check that no secrets or credentials are included
4. Verify the changes align with the original request

### Common Pitfalls to Avoid

- Don't commit without user request
- Don't use `--no-verify` or skip hooks
- Don't force push to main/master
- Don't create unnecessary files
- Don't use bash for file operations (use Read/Write/Edit)

## Project-Specific Notes

### Success Card Components

When implementing success cards, consider:

1. **Customization Options**:
   - Title text
   - Message content
   - Icon type
   - Color scheme
   - Animation effects
   - Dismiss behavior

2. **Accessibility Features**:
   - ARIA live regions for dynamic updates
   - Keyboard navigation support
   - Screen reader friendly announcements
   - Sufficient color contrast (WCAG AA minimum)

3. **Use Cases**:
   - Form submission confirmation
   - Action completion feedback
   - Payment success messages
   - Account creation confirmation
   - File upload completion

4. **Design Patterns**:
   - Clean, minimal design
   - Clear visual hierarchy
   - Consistent spacing and typography
   - Smooth animations (prefer CSS over JS)

## Resources

### Documentation to Create

- [ ] README.md - Project overview and usage
- [ ] CONTRIBUTING.md - Contribution guidelines
- [ ] LICENSE - Project license
- [ ] CHANGELOG.md - Version history

### Useful Links

- [MDN Web Docs](https://developer.mozilla.org/) - HTML/CSS/JS reference
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards
- [BEM Methodology](http://getbem.com/) - CSS naming convention
- [Conventional Commits](https://www.conventionalcommits.org/) - Commit message format

## Version History

- **2025-11-17**: Initial CLAUDE.md creation
  - Established project structure guidelines
  - Defined development workflows
  - Set code conventions
  - Added AI assistant guidelines

---

**Last Updated**: 2025-11-17
**Maintained By**: AI Assistants & Project Contributors
**Review Frequency**: Update when significant project changes occur
