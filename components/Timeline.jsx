import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import {FaMoneyBillAlt, FaSolarPanel, FaSyringe, FaStethoscope, FaLaptopMedical} from 'react-icons/fa'
import {GiMedicines} from 'react-icons/gi'
import {MdSecurity} from 'react-icons/md'
import useMedia from 'use-media';

const TimeLine = () => { 
    const mini = useMedia({ minWidth: '768px' })
    return (
        <section className="w-full h-full">
            <div className="w-11/12 lg:w-5/6 max-w-6xl mx-auto">
                <h1 className=" mt-20 text-center text-blue-500 text-4xl lg:text-5xl font-bold mb-10 xl:mb-16">Zobacz co mamy do zaoferowania</h1>
                <VerticalTimeline animate={mini}>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        iconStyle={{ background: '#60A5FA', color: '#fff' }}
                        icon={
                            <FaSyringe />
                        }
                    >
                        <h3 className="text-blue-500 text-2xl font-bold text-center md:text-left">Bogaty zestaw zabiegów</h3>
                        <p className="text-coolGray-500 text-md xl:text-xl text-center md:text-left">
                            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
                            accusamus quisquam.
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        iconStyle={{ background: '#60A5FA', color: '#fff' }}
                        icon={
                            <FaStethoscope />
                        }
                    >
                        <h3 className="text-blue-500 text-2xl font-bold text-center md:text-left">Doświadczeni pracownicy</h3>
                        <p className="text-coolGray-500 text-md xl:text-xl text-center md:text-left">
                            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
                            accusamus quisquam.
                        </p>
                    </VerticalTimelineElement>
                           
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        iconStyle={{ background: '#10B981', color: '#fff' }}
                        icon={
                            <FaLaptopMedical />
                        }
                    >
                        <h3 className="text-emerald-500 text-2xl font-bold text-center md:text-left">Najnowszy sprzęt medyczny</h3>
                        <p className="text-coolGray-500 text-md xl:text-xl text-center md:text-left">
                            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
                            accusamus quisquam.
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        iconStyle={{ background: '#10B981', color: '#fff' }}
                        icon={
                            <GiMedicines />
                        }
                    >
                        <h3 className="text-emerald-500 text-2xl font-bold text-center md:text-left">Własna apteka na miejscu</h3>
                        <p className="text-coolGray-500 text-md xl:text-xl text-center md:text-left">
                            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
                            accusamus quisquam.
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        iconStyle={{ background: '#FB7185', color: '#fff' }}
                        icon={
                            <MdSecurity />
                        }
                    >
                        <h3 className="text-rose-400 text-2xl font-bold text-center md:text-left">Bezpieczeństwo danych</h3>
                        <p className="text-coolGray-500 text-md xl:text-xl text-center md:text-left">
                            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
                            accusamus quisquam.
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        iconStyle={{ background: '#FB7185', color: '#fff' }}
                        icon={
                            <FaMoneyBillAlt />
                        }
                    >
                        <h3 className="text-rose-400 text-2xl font-bold text-center md:text-left">Konkurencyjne ceny</h3>
                        <p className="text-coolGray-500 text-md xl:text-xl text-center md:text-left">
                            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
                            accusamus quisquam.
                        </p>
                    </VerticalTimelineElement>

                </VerticalTimeline>
            </div>
        </section>
    )
}

export default TimeLine;
