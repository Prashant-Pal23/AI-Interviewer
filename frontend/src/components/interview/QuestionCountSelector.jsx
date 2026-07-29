const QuestionCountSelector = ({ value, onChange }) => {

    const options = [5, 10, 15];

    return (
        <div className="flex gap-3">
            {
                options.map((count) => (
                    <button
                        key={count}
                        type="button"
                        className={`btn ${ value === count? "btn-primary": "btn-outline"}`
                    }
                        onClick={() => onChange(count)}
                    >
                        {count}
                    </button>
                ))
            }
        </div>
    );
};

export default QuestionCountSelector;