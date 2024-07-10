import { addEventListeners, updateTabCount } from '@/lib/lib';

(async () => {
  addEventListeners();

  await updateTabCount('restart');
})();
