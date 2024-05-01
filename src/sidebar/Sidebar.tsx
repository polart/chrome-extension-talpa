import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Field from './Field';
import talpaIcon from './icon-128.png';

const foundDataPanel = ({
    id,
    lang,
    defaultMessage,
    text,
}: {
    id: string;
    lang: string;
    defaultMessage: string;
    text: string;
}) => {
    const body = (
        <>
            <Field name="String ID" content={id} />
            <Field name="Source in English" content={defaultMessage} />
            <Field name={`Localized content (${lang})`} content={text} />
        </>
    );
    return {
        body,
    };
};

const missingDataPanel = ({
    lang,
    text,
    debugInfo,
}: {
    lang: string;
    text: string;
    debugInfo: string;
}) => {
    const body = (
        <>
            <div className="pb-5 pt-6">
                <div className="rounded-md bg-red-50 p-4">
                    <h3 className="text-base font-medium text-red-800 flex flex-row justify-start gap-x-2">
                        <XCircleIcon className="mt-0.5 h-5 w-5 text-red-800" aria-hidden="true" />
                        No string ID detected
                    </h3>
                </div>
            </div>
            <Field name={`Localized content (${lang})`} content={text} />
            <Field name="Debug information" content={debugInfo} />
        </>
    );
    return {
        body,
    };
};

export default function Sidebar({ data }: { data: DetectedLoc }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    const close = () => {
        setOpen(false);
        setTimeout(() => {
            window.parent.postMessage('close', '*');
        }, 500);
    };

    const destroy = () => {
        setOpen(false);
        setTimeout(() => {
            window.parent.postMessage('destroy', '*');
        }, 500);
    };

    const { body } =
        data && data.id
            ? foundDataPanel({
                  id: data.id,
                  lang: data.lang,
                  defaultMessage: data.defaultMessage || '',
                  text: data.text,
              })
            : missingDataPanel({
                  lang: data.lang,
                  text: data.text,
                  debugInfo: data.debugInfo || '',
              });

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={close}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-400"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-400"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full">
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                                            <div className="px-4 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900 flex items-center">
                                                        <img
                                                            src={talpaIcon}
                                                            className="h-10 w-10"
                                                            alt=""
                                                        />
                                                        Talpa
                                                    </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#121117] focus:ring-offset-2"
                                                            onClick={close}>
                                                            <span className="absolute -inset-2.5" />
                                                            <span className="sr-only">
                                                                Close panel
                                                            </span>
                                                            <XMarkIcon
                                                                className="h-6 w-6"
                                                                aria-hidden="true"
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 flex-col justify-between">
                                                <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                                    {body}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-shrink-0 justify-end px-4 py-4">
                                            <button
                                                type="button"
                                                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                                                onClick={destroy}>
                                                Exit Talpa
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
