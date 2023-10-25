export const highlightMention = (body: string) => {
  const regex = /@(\w+\s\w+)/g;
  return body.replace(regex, '<span class="highlight">$1</span>');
};
