import React, { PureComponent } from "react";

class StatCard extends PureComponent {
  render() {
    const { title, value, icon, color = "blue" } = this.props;
    console.log(`Rendering StatCard: ${title}`);

    return (
      <div
        className={`bg-white p-4 rounded-lg border border-gray-100 shadow-sm`}
      >
        <div className="flex items-center mb-2">
          {icon && (
            <div
              className={`w-8 h-8 rounded-full bg-${color}-100 flex items-center justify-center mr-2`}
            >
              {icon}
            </div>
          )}
          <h3 className="text-gray-700 font-medium">{title}</h3>
        </div>
        <p className={`text-xl font-semibold text-${color}-600 mt-1`}>
          {value}
        </p>
      </div>
    );
  }
}

export default StatCard;
