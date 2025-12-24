interface TimeSlot {
    startTime: string;
    endTime: string;
  }
  
  interface DaySchedule {
    isEnabled: boolean;
    timeSlots: TimeSlot[];
  }
  
  interface ScheduleState {
    selectedProperty: string;
    schedule: Record<string, DaySchedule>;
    visitDuration: string;
  }