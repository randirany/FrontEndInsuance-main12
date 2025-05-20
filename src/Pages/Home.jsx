import React from 'react';

import ChartDashboard from './../components/ChartDashboard';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation()

  const stats = [
    {
      name: t("home.totalCu"), value: "125", change: "+0.43%", icon: <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="29" cy="29" r="29" fill="#3F94D9" />
        <ellipse cx="25.7511" cy="22.5" rx="4.33333" ry="4.33333" fill="[rgb(255,255,255)]" />
        <ellipse cx="25.7511" cy="34.4177" rx="7.58333" ry="4.33333" fill="[rgb(255,255,255)]" />
        <path d="M38.7496 34.4172C38.7496 36.2121 36.5444 37.6671 33.852 37.6671C34.6453 36.8001 35.1907 35.7118 35.1907 34.4187C35.1907 33.124 34.644 32.0347 33.8493 31.1672C36.5417 31.1672 38.7496 32.6222 38.7496 34.4172Z" fill="[rgb(255,255,255)]" />
        <path d="M35.4996 22.5008C35.4996 24.2957 34.0445 25.7508 32.2496 25.7508C31.8582 25.7508 31.483 25.6816 31.1355 25.5548C31.648 24.6534 31.9407 23.6107 31.9407 22.4996C31.9407 21.3893 31.6484 20.3473 31.1366 19.4464C31.4838 19.3198 31.8586 19.2508 32.2496 19.2508C34.0445 19.2508 35.4996 20.7059 35.4996 22.5008Z" fill="[rgb(255,255,255)]" />
      </svg>
    },
    { name: t("home.TotalIncome"), value: "8.3 K", change: "+0.43%", icon: <svg width="58" height="58" viewBox="0 0 58 58" fill="none"><circle cx="29" cy="29" r="29" fill="#3F94D9"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M29 39.833c5.983 0 10.833-4.85 10.833-10.833 0-5.983-4.85-10.834-10.833-10.834-5.983 0-10.834 4.85-10.834 10.834 0 5.983 4.85 10.833 10.834 10.833zm.812-17.333a.812.812 0 10-1.625 0v.343c-1.766.316-3.25 1.643-3.25 3.448 0 2.077 1.964 3.521 4.063 3.521 1.491 0 2.437.982 2.437 1.896 0 .915-.946 1.896-2.437 1.896-1.491 0-2.438-.981-2.438-1.896a.812.812 0 10-1.625 0c0 1.805 1.484 3.132 3.25 3.449v.343a.812.812 0 101.625 0v-.343c1.767-.317 3.25-1.644 3.25-3.449 0-2.077-1.963-3.52-4.062-3.52-1.491 0-2.438-.982-2.438-1.896 0-.915.947-1.896 2.438-1.896s2.437.98 2.437 1.895a.813.813 0 001.625 0c0-1.805-1.483-3.132-3.25-3.448V22.5z" fill="#fff"></path></svg> },
    { name: t("home.TotalExpenses"), value: "6.3 K", change: "+0.43%", icon: <svg width="58" height="58" viewBox="0 0 58 58" fill="none"><circle cx="29" cy="29" r="29" fill="#FF9C55"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M29 39.833c5.983 0 10.833-4.85 10.833-10.833 0-5.983-4.85-10.834-10.833-10.834-5.983 0-10.834 4.85-10.834 10.834 0 5.983 4.85 10.833 10.834 10.833zm.812-17.333a.812.812 0 10-1.625 0v.343c-1.766.316-3.25 1.643-3.25 3.448 0 2.077 1.964 3.521 4.063 3.521 1.491 0 2.437.982 2.437 1.896 0 .915-.946 1.896-2.437 1.896-1.491 0-2.438-.981-2.438-1.896a.812.812 0 10-1.625 0c0 1.805 1.484 3.132 3.25 3.449v.343a.812.812 0 101.625 0v-.343c1.767-.317 3.25-1.644 3.25-3.449 0-2.077-1.963-3.52-4.062-3.52-1.491 0-2.438-.982-2.438-1.896 0-.915.947-1.896 2.438-1.896s2.437.98 2.437 1.895a.813.813 0 001.625 0c0-1.805-1.483-3.132-3.25-3.448V22.5z" fill="#fff"></path></svg> },
    { name: t("home.DueAmount"), value: "12.5 K", change: "+0.43%", icon: <svg width="58" height="58" viewBox="0 0 58 58" fill="none"><circle cx="29" cy="29" r="29" fill="#3F94D9"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M29 39.833c5.983 0 10.833-4.85 10.833-10.833 0-5.983-4.85-10.834-10.833-10.834-5.983 0-10.834 4.85-10.834 10.834 0 5.983 4.85 10.833 10.834 10.833zm.812-17.333a.812.812 0 10-1.625 0v.343c-1.766.316-3.25 1.643-3.25 3.448 0 2.077 1.964 3.521 4.063 3.521 1.491 0 2.437.982 2.437 1.896 0 .915-.946 1.896-2.437 1.896-1.491 0-2.438-.981-2.438-1.896a.812.812 0 10-1.625 0c0 1.805 1.484 3.132 3.25 3.449v.343a.812.812 0 101.625 0v-.343c1.767-.317 3.25-1.644 3.25-3.449 0-2.077-1.963-3.52-4.062-3.52-1.491 0-2.438-.982-2.438-1.896 0-.915.947-1.896 2.438-1.896s2.437.98 2.437 1.895a.813.813 0 001.625 0c0-1.805-1.483-3.132-3.25-3.448V22.5z" fill="#fff"></path></svg> },
    { name: t("home.TotalVisa"), value: "1.3 K", change: "+0.43%", icon: <svg width="58" height="58" viewBox="0 0 58 58" fill="none"><circle cx="29" cy="29" r="29" fill="#3F94D9"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M29 39.833c5.983 0 10.833-4.85 10.833-10.833 0-5.983-4.85-10.834-10.833-10.834-5.983 0-10.834 4.85-10.834 10.834 0 5.983 4.85 10.833 10.834 10.833zm.812-17.333a.812.812 0 10-1.625 0v.343c-1.766.316-3.25 1.643-3.25 3.448 0 2.077 1.964 3.521 4.063 3.521 1.491 0 2.437.982 2.437 1.896 0 .915-.946 1.896-2.437 1.896-1.491 0-2.438-.981-2.438-1.896a.812.812 0 10-1.625 0c0 1.805 1.484 3.132 3.25 3.449v.343a.812.812 0 101.625 0v-.343c1.767-.317 3.25-1.644 3.25-3.449 0-2.077-1.963-3.52-4.062-3.52-1.491 0-2.438-.982-2.438-1.896 0-.915.947-1.896 2.438-1.896s2.437.98 2.437 1.895a.813.813 0 001.625 0c0-1.805-1.483-3.132-3.25-3.448V22.5z" fill="#fff"></path></svg> },
    { name: t("home.TotalCash"), value: "5.1 K", change: "+18%", icon: <svg width="58" height="58" viewBox="0 0 58 58" fill="none"><circle cx="29" cy="29" r="29" fill="#3F94D9"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M29 39.833c5.983 0 10.833-4.85 10.833-10.833 0-5.983-4.85-10.834-10.833-10.834-5.983 0-10.834 4.85-10.834 10.834 0 5.983 4.85 10.833 10.834 10.833zm.812-17.333a.812.812 0 10-1.625 0v.343c-1.766.316-3.25 1.643-3.25 3.448 0 2.077 1.964 3.521 4.063 3.521 1.491 0 2.437.982 2.437 1.896 0 .915-.946 1.896-2.437 1.896-1.491 0-2.438-.981-2.438-1.896a.812.812 0 10-1.625 0c0 1.805 1.484 3.132 3.25 3.449v.343a.812.812 0 101.625 0v-.343c1.767-.317 3.25-1.644 3.25-3.449 0-2.077-1.963-3.52-4.062-3.52-1.491 0-2.438-.982-2.438-1.896 0-.915.947-1.896 2.438-1.896s2.437.98 2.437 1.895a.813.813 0 001.625 0c0-1.805-1.483-3.132-3.25-3.448V22.5z" fill="#fff"></path></svg> },
    { name: t("home.TotalBank"), value: "1.9 K", change: "+18%", icon: <svg width="58" height="58" viewBox="0 0 58 58" fill="none"><circle cx="29" cy="29" r="29" fill="#3F94D9"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M29 39.833c5.983 0 10.833-4.85 10.833-10.833 0-5.983-4.85-10.834-10.833-10.834-5.983 0-10.834 4.85-10.834 10.834 0 5.983 4.85 10.833 10.834 10.833zm.812-17.333a.812.812 0 10-1.625 0v.343c-1.766.316-3.25 1.643-3.25 3.448 0 2.077 1.964 3.521 4.063 3.521 1.491 0 2.437.982 2.437 1.896 0 .915-.946 1.896-2.437 1.896-1.491 0-2.438-.981-2.438-1.896a.812.812 0 10-1.625 0c0 1.805 1.484 3.132 3.25 3.449v.343a.812.812 0 101.625 0v-.343c1.767-.317 3.25-1.644 3.25-3.449 0-2.077-1.963-3.52-4.062-3.52-1.491 0-2.438-.982-2.438-1.896 0-.915.947-1.896 2.438-1.896s2.437.98 2.437 1.895a.813.813 0 001.625 0c0-1.805-1.483-3.132-3.25-3.448V22.5z" fill="#fff"></path></svg> },
    { name: t("home.TotalProfit"), value: "2.0 K", change: "+0.43%", icon: <svg width="58" height="58" viewBox="0 0 58 58" fill="none"><circle cx="29" cy="29" r="29" fill="#3F94D9"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M29 39.833c5.983 0 10.833-4.85 10.833-10.833 0-5.983-4.85-10.834-10.833-10.834-5.983 0-10.834 4.85-10.834 10.834 0 5.983 4.85 10.833 10.834 10.833zm.812-17.333a.812.812 0 10-1.625 0v.343c-1.766.316-3.25 1.643-3.25 3.448 0 2.077 1.964 3.521 4.063 3.521 1.491 0 2.437.982 2.437 1.896 0 .915-.946 1.896-2.437 1.896-1.491 0-2.438-.981-2.438-1.896a.812.812 0 10-1.625 0c0 1.805 1.484 3.132 3.25 3.449v.343a.812.812 0 101.625 0v-.343c1.767-.317 3.25-1.644 3.25-3.449 0-2.077-1.963-3.52-4.062-3.52-1.491 0-2.438-.982-2.438-1.896 0-.915.947-1.896 2.438-1.896s2.437.98 2.437 1.895a.813.813 0 001.625 0c0-1.805-1.483-3.132-3.25-3.448V22.5z" fill="#fff"></path></svg> },

  ]

  return (
    <div>
      <div className='py-3 dark:bg-dark2 border dark:border-borderNav-b-gray-200 min-h-screen'>
        <div>
          <main className="flex-1 pb-10">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              {/* Stats */}
              <div className="mt-8">
                <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
                  {stats.map((item) => (
                    <div key={item.name} className="dark:bg-navbarBack rounded-[10px] bg-[rgb(255,255,255)] p-6 shadow-1 dark:bg-gray-dark shadow card">
                      {/* <div className="p-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-[35px]">
                            <i className={`  lh-1 ${item.icon} fa-2xl text-primary`}></i>
                          </div>
                          <div className="flex-1 w-0 mr-5">
                            {item.icon}
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                              <dd>
                                <div className="text-lg font-medium text-gray-900">{item.value}</div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div> */}
                      {item.icon}
                      <div className="mt-6 flex items-end justify-between">
                        <dl>
                          <dt className="mb-1.5 text-heading-6 font-bold dark:text-[rgb(255,255,255)] text-[24px] ">{item.value}</dt>
                          <dd className="text-sm font-medium text-dark-6 text-[#8D8D8D]">{item.name}</dd>
                        </dl>
                        <dl className="text-sm font-medium text-[#22AD5C]">
                          <dt className="flex items-center gap-1.5">{item.change}
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M4.357 2.393L.91 5.745 0 4.861 5 0l5 4.861-.909.884-3.448-3.353V10H4.357V2.393z"></path>
                            </svg>
                          </dt>
                        </dl>
                      </div>
                    </div>
                  ))}
                </div>

                <ChartDashboard />
              </div>

              {/* <div className="grid grid-cols-1 gap-5 mt-8 lg:grid-cols-2">
                <div className="p-6 bg-[rgb(255,255,255)] rounded-lg shadow">
                  <h2 className="text-lg font-medium leading-6 text-gray-900">نظرة عامة على الإيرادات</h2>
                  <div className="mt-2">
                    <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
                      <ChartBarIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-[rgb(255,255,255)] rounded-lg shadow">
                  <h2 className="text-lg font-medium leading-6 text-gray-900">توزيع أنواع التأمين</h2>
                  <div className="mt-2">
                    <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
                      <ChartPieIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h2 className="text-lg font-medium leading-6 text-gray-900">أحدث البوالص</h2>
                    <p className="mt-2 text-sm text-gray-700">قائمة بأحدث بوالص التأمين المضافة للنظام.</p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:mr-16 sm:flex-none">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-[rgb(255,255,255)] bg-indigo-600 border dark:border-borderNav border dark:border-borderNav-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                      إضافة بوليصة
                    </button>
                  </div>
                </div>
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                            >
                              رقم البوليصة
                            </th>
                            <th scope="col" className="py-3.5 px-3 text-right text-sm font-semibold text-gray-900">
                              العميل
                            </th>
                            <th scope="col" className="py-3.5 px-3 text-right text-sm font-semibold text-gray-900">
                              النوع
                            </th>
                            <th scope="col" className="py-3.5 px-3 text-right text-sm font-semibold text-gray-900">
                              التاريخ
                            </th>
                            <th scope="col" className="py-3.5 px-3 text-right text-sm font-semibold text-gray-900">
                              الحالة
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                              <span className="sr-only">تعديل</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          /
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h2 className="text-lg font-medium leading-6 text-gray-900">أحدث المطالبات</h2>
                    <p className="mt-2 text-sm text-gray-700">قائمة بأحدث المطالبات المقدمة.</p>
                  </div>
                </div>
                <div className="mt-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:pl-0"
                            >
                              رقم المطالبة
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                              العنوان
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                              العميل
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                              التاريخ
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                              الحالة
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                              <span className="sr-only">تعديل</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-[rgb(255,255,255)]">

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Home