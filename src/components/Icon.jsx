import * as icons from 'lucide-react';

function toPascalCase(name) {
  return String(name)
    .split('-')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

export default function Icon({ name, ...rest }) {
  if (!name) return null;
  const Cmp = icons[toPascalCase(name)];
  if (!Cmp) return null;
  return <Cmp {...rest} />;
}
