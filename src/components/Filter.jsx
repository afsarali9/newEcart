import './filter.css'

const Filter = ({ selectedCategory, setSelectedCategory, categories }) => {
  return (
    <div className='filter'>
      {/* <div className='filter_item'>
        <p>Filter by Price :</p>
        <div className="slider-container">
          <input type="range" max="100" />
          <input type="range" max="100" />
        </div>
      </div> */}
      <div className='filter_item'>
        <p>Filter by Category :</p>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Filter