import React from "react";

function ApprovedAppointmentsGraph({ lastWeek, weekBeforeLast }) {
    const total = lastWeek + weekBeforeLast;
    const lastWeekPercentage = (lastWeek / total) * 100;
    const weekBeforeLastPercentage = (weekBeforeLast / total) * 100;

    return (
        <div className="card">
            <div className="card-body approved-appointments-graph">
                <h3 className="card-title text-center mb-4">Approval Rate</h3>
                <div className="row">
                    <div className="col">
                        <div className="progress">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${lastWeekPercentage}%`, backgroundColor: '#0584c4a7' }}
                                aria-valuenow={lastWeekPercentage}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                {lastWeek}
                            </div>
                        </div>
                        <div className="text-center mt-2">Last 7 Days</div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <div className="progress">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${weekBeforeLastPercentage}%`, backgroundColor: '#05c408a3' }}
                                aria-valuenow={weekBeforeLastPercentage}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                {weekBeforeLast}
                            </div>
                        </div>
                        <div className="text-center mt-2">Previous 7 Days</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApprovedAppointmentsGraph;
