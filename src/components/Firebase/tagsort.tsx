//ここで優先順位付けてます。
import { useState } from 'react';
import React from 'react';

interface TagFields {
  [key: string]: boolean;
}

interface TagDisplayProps {
  tag: TagFields;
}

const TAG_PRIORITY: { [key: string]: number } = {
  Able: 1,
  Bravo: 2,
  // 追加したタグ名と優先順位を追記する。今回の場合は左に置きたいものを小さい数で定義。
};
export const TagDisplay: React.FC<TagDisplayProps> = ({ tag }) => {
    const [tagFields, setTagFields] = useState<TagFields>({});
  const sortedTags = Object.entries(tag).sort(([a], [b]) => {
    const priorityA = TAG_PRIORITY[a] || Infinity;
    const priorityB = TAG_PRIORITY[b] || Infinity;
    return priorityA - priorityB;
  }); //めちゃくちゃ簡単に言えばカスタムソート。優先順位を見てソートする。

  return (
    <div>
      Tags:
      {sortedTags.map(([tagName, tagValue]) => {
        if (tagValue) {
          return <span key={tagName}>{tagName} </span>;
        }
        return null;
      })}
    </div>
  );
};