export function getRedirectPath({ type, avatar }) {
  let url = (type === 'boss') ? '/genius' : '/boss';
  if (!avatar) {
    url = (type === 'boss') ? '/bossinfo' : '/geniusinfo';
  }
  return url;
}

export function getChatId (userId, targetId) {
  return [userId, targetId].sort().join('_');
}
