import { useEffect, useState } from 'react';

import List from './List';
import { useItemsStateContext } from '../store/itemContext';

export default function Content({ displayList }) {
  const items = useItemsStateContext();
  // if there is no item, the image (nasa) will be display
  const [imageRender, setImageRender] = useState(true);
  useEffect(() => {
    items.length > 0 ? setImageRender(false) : setImageRender(true);
  }, [items]);

  return (
    <section className="contend">
      <div
        className={
          imageRender ? 'contend--wrapper nasa-image' : 'contend--wrapper'
        }
      >
        <List displayList={displayList} imageRender={imageRender} />
      </div>
    </section>
  );
}
