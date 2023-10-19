import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAtom, useSetAtom } from "jotai";
import {
  MENU_LIST,
  jobAtom,
  jobConditionAtom,
  jobSortAtom,
  loadingAtom,
} from "@/atoms/atoms";
import { useRouter } from "next/router";
import { convertObjectToQueryString } from "@/libs/convertQuery";
import { JobListResponse } from "./job.type";
import fetch from "@/libs/fetch";

export default function SortMenu() {
  const [sortOption, setSortOption] = useAtom(jobSortAtom);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const setData = useSetAtom(jobAtom);
  const setLoading = useSetAtom(loadingAtom);
  const [condition, setCondition] = useAtom(jobConditionAtom);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = async (option: (typeof MENU_LIST)[number]) => {
    setSortOption(option); // 選択した選択肢にテキストを更新
    setAnchorEl(null); // メニューを閉じる
    try {
      setLoading(true);
      const queryString = convertObjectToQueryString(condition);
      const sortQuery =
        option === "高単価順" ? "&sort=cost" : "新着順" ? "&sort=latest" : null;
      const { data } = await fetch.get<JobListResponse>(
        `/api/v1/jobs${queryString}${sortQuery}`
      );
      setData(data);
      router.push(`/job/search/${queryString}${sortQuery}`, undefined, {
        shallow: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        id="sort-button"
        aria-controls={open ? "sort-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        variant="text"
      >
        {sortOption}
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "sort-button",
        }}
      >
        {MENU_LIST.map((menu) => (
          <MenuItem key={menu} onClick={() => handleMenuItemClick(menu)}>
            {menu}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
