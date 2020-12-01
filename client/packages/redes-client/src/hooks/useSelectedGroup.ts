import { useState, useEffect } from "react";
import { useFilterState } from "../services/FilterProvider";
import { useCommunityExtra } from "../services/CommunityExtraProvider";
import { Group } from "../types";

export default function useSelectedGroup(): Array<any> {
  const state = useFilterState();
  const { groups } = useCommunityExtra();
  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>();

  useEffect(() => {
    const group = groups.find(
      (group) => group.id === state.selectedGroup?.value
    );
    setSelectedGroup(group);
  }, [state.selectedGroup, groups]);

  const isVolunteerSelected = !!selectedGroup?.isVolunteer;

  return [selectedGroup, isVolunteerSelected];
}
