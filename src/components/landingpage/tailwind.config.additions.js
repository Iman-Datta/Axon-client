// Merge this `extend` block into your existing tailwind.config.js
// (module.exports.theme.extend), so classes like bg-card, text-todo,
// border-border, bg-primary, etc. resolve to the CSS variables in
// axon-theme.css.

module.exports = {
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          raised: "hsl(var(--surface-raised))",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          strong: "hsl(var(--border-strong))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        todo: "hsl(var(--todo))",
        dev: "hsl(var(--dev))",
        review: "hsl(var(--review))",
        done: "hsl(var(--done))",
        danger: "hsl(var(--danger))",
      },
    },
  },
};
