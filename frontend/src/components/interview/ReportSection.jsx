const ReportSection = ({ title, items }) => {

    return (

        <div className="card bg-base-100 shadow">

            <div className="card-body">

                <h2 className="card-title">
                    {title}
                </h2>

                <ul className="list-disc ml-5">

                    {
                        items.map((item, index) => (

                            <li key={index}>
                                {item}
                            </li>

                        ))
                    }

                </ul>

            </div>

        </div>

    );

};

export default ReportSection;