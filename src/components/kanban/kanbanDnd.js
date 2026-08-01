export const END_SUFFIX = "__end";

export const toEndId = (column) => `${column}${END_SUFFIX}`;

export const isEndId = (id) => String(id).endsWith(END_SUFFIX);

export const fromEndId = (id) => String(id).slice(0, -END_SUFFIX.length);
