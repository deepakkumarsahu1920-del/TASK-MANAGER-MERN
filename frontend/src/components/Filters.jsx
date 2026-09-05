import { FiSearch } from 'react-icons/fi';

const Filters = ({ status, setStatus, search, setSearch, sortBy, setSortBy, onDeleteCompleted }) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6 items-stretch md:items-center">
      <div className="relative flex-1">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded-md px-3 py-2"
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border rounded-md px-3 py-2"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>
      </select>

      <button
        onClick={onDeleteCompleted}
        className="bg-red-50 text-red-600 px-3 py-2 rounded-md text-sm hover:bg-red-100"
      >
        Clear Completed
      </button>
    </div>
  );
};

export default Filters;
