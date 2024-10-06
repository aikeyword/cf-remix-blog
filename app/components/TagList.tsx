import { Link } from "@remix-run/react";

interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <Link
          key={tag}
          to={`/tags/${tag}`}
          className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}