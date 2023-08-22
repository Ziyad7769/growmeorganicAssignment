import React, { useState } from "react";
import {
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface Department {
  department: string;
  sub_departments: string[];
}

const DepartmentList: React.FC = () => {
  const data: Department[] = [
    {
      department: "customer_service",
      sub_departments: ["support", "customer_success"],
    },
    {
      department: "design",
      sub_departments: ["graphic_design", "product_design", "web_design"],
    },
  ];

  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<{ [key: string]: string[] }>({});

  const handleSubDepartmentToggle =
    (department: string, subDepartment: string) => () => {
      setSelected((prevSelected) => {
        const selectedSubDepartments = prevSelected[department] || [];
        const newSelectedSubDepartments = selectedSubDepartments.includes(
          subDepartment
        )
          ? selectedSubDepartments.filter((subDep) => subDep !== subDepartment)
          : [...selectedSubDepartments, subDepartment];

        return {
          ...prevSelected,
          [department]: newSelectedSubDepartments,
        };
      });
    };

  const handleDepartmentToggle = (department: string) => () => {
    setSelected((prevSelected) => {
      const isSelected =
        prevSelected[department]?.length ===
        data.find((item) => item.department === department)?.sub_departments
          .length;
      return {
        ...prevSelected,
        [department]: isSelected
          ? []
          : data.find((item) => item.department === department)
              ?.sub_departments || [],
      };
    });
  };

  const handleExpand = (value: string) => {
    setExpanded((prevExpanded) =>
      prevExpanded.includes(value)
        ? prevExpanded.filter((dep) => dep !== value)
        : [...prevExpanded, value]
    );
  };

  const isExpanded = (value: string) => expanded.includes(value);

  const isSelected = (department: string, subDepartment: string) => {
    const selectedSubDepartments = selected[department] || [];
    const departmentData = data.find((item) => item.department === department);
    return (
      departmentData?.sub_departments.length ===
        selectedSubDepartments.length ||
      selectedSubDepartments.includes(subDepartment)
    );
  };

  return (
    <List>
      {data.map((item) => (
        <div key={item.department}>
          <ListItem>
            <ListItemIcon
              onClick={() => handleExpand(item.department)}
              style={{ cursor: "pointer" }}
            >
              {isExpanded(item.department) ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={isSelected(item.department, "")}
                tabIndex={-1}
                disableRipple
                onClick={handleDepartmentToggle(item.department)}
              />
            </ListItemIcon>
            <ListItemText primary={item.department} />
          </ListItem>
          <Collapse
            in={isExpanded(item.department)}
            timeout="auto"
            unmountOnExit
          >
            <List>
              {item.sub_departments.map((subDepartment) => (
                <ListItem
                  key={subDepartment}
                  onClick={handleSubDepartmentToggle(
                    item.department,
                    subDepartment
                  )} // Use the new handler here
                  style={{ paddingLeft: "32px", cursor: "pointer" }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isSelected(item.department, subDepartment)}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDepartment} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
