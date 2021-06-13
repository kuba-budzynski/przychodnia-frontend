import { filter, some, flatten } from 'lodash';
import { date } from 'yup/lib/locale';
export function getSlots(plannedAppointments, doctors, fromDate, toDate) {
    const times = generateTimes();
    const appointments = [];
    for (let i = fromDate.getDate(); i <= toDate.getDate(); i++) {
        appointments.push(
            flatten(
                doctors.map((d) => {
                    const doctorsPlannedVisits = filter(plannedAppointments, (a) => {
                        return a.doctorKey === d.id && new Date(a.date).getDate() === i && new Date(a.date).getMonth() === fromDate.getMonth();
                    });
                    const availableHours = filter(times, (hour) => {
                        const hourAsDate = new Date(
                            fromDate.getFullYear(),
                            fromDate.getMonth(),
                            i,
                            parseInt(hour.split(':')[0]),
                            parseInt(hour.split(':')[1])
                        );

                        const available = !some(doctorsPlannedVisits, (a) => {
                            const visitDate = new Date(a.date);
                            return (
                                visitDate.getTime() <= hourAsDate.getTime() &&
                                hourAsDate.getTime() < visitDate.setMinutes(visitDate.getMinutes() + a.details[0].duration)
                            );
                        });
                        return available;
                    });

                    return flatten(
                        availableHours.map((hour) => {
                            return d.uslugiLekarzy.map((service) => {
                                return {
                                    date: new Date(
                                        fromDate.getFullYear(),
                                        fromDate.getMonth(),
                                        i,
                                        parseInt(hour.split(':')[0]),
                                        parseInt(hour.split(':')[1])
                                    ),
                                    duration: service.czasTrwania,
                                    price: service.cena,
                                    notes: '',
                                    typeKey: '',
                                    serviceKey: service.id,
                                    serviceName: service.usluga.nazwa,
                                    doctorKey: d.id
                                };
                            });
                        })
                    );
                })
            )
        );
    }
    return appointments;
}

function generateTimes() {
    let quarterHours = ['00', '15', '30', '45'];
    let times = [];
    for (var i = 8; i < 15; i++) {
        for (var j = 0; j < 4; j++) {
            times.push(i + ':' + quarterHours[j]);
        }
    }
    return times;
}
