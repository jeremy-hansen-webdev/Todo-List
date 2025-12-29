interface FilterProps {
  handleFilterSelect: (userId: number | undefined) => void;
}

const FilterUsers = ({ handleFilterSelect }: FilterProps) => {
  return (
    <div>
      <select
        onChange={(e) =>
          handleFilterSelect(
            e.target.value ? Number(e.target.value) : undefined,
          )
        }
        className="bg-amber-50 border-2 px-4 ml-5"
      >
        <option value="">All Users</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
    </div>
  );
};

export default FilterUsers;
