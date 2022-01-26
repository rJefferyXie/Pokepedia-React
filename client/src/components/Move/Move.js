import TypeColorSchemes from "../Constants/TypeColorSchemes";

import React, { useEffect, useState } from "react";

const Move = (props) => {
    const [inspecting, setInspecting] = useState(false);

    return (
        <tr className="table-move-row">
            <td className="td-level">{props.level}</td>
            <td>{props.move.name}</td>
            <td>{props.move.type.name}</td>
            <td>{props.move.damage_class.name}</td>

            {props.move.power > 0 ? 
            <td>{props.move.power}</td> :
            <td>-</td>}

            <td>{props.move.pp}</td>

            {props.move.accuracy > 0 ? 
            <td>{props.move.accuracy}</td> :
            <td>-</td>}

            <td>{props.method}</td>
      </tr>
    )
};

export default Move;