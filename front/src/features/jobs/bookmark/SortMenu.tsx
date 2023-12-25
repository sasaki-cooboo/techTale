import {
  BOOKMARK_MENU_LIST,
  jobBookmarkAtom,
  jobBookmarkSortAtom,
  loadingAtom,
} from "@/atoms/atoms";
import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
import { useAtom, useSetAtom } from "jotai";
import fetch from "@/libs/fetch";
import { JobListResponse } from "../job.type";

const SortMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [sortOption, setSortOption] = useAtom(jobBookmarkSortAtom);
  const setBokmarkJobs = useSetAtom(jobBookmarkAtom);
  const open = Boolean(anchorEl);
  const setLoading = useSetAtom(loadingAtom);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = async (
    option: (typeof BOOKMARK_MENU_LIST)[number]
  ) => {
    setSortOption(option); // 選択した選択肢にテキストを更新
    setAnchorEl(null); // メニューを閉じる
    const getSortQuery = (menu: (typeof BOOKMARK_MENU_LIST)[number]) => {
      if (menu === "ブックマーク登録順") {
        return "";
      }
      return `sort=${menu === "新着順" ? "latest" : "cost"}`;
    };
    try {
      setLoading(true);
      const { data } = await fetch.get<JobListResponse>(
        `/api/v1/jobs?${getSortQuery(option)}`
      );
      setBokmarkJobs(data);
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
        {BOOKMARK_MENU_LIST.map((menu) => (
          <MenuItem key={menu} onClick={() => handleMenuItemClick(menu)}>
            {menu}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default SortMenu;
